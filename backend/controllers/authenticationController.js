
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const authenticateUser = (async (req, res) => {
    try {
        let user = await User.findOne({
            where: { email: req.body.email }
        });

        if (!user || !(await bcrypt.compare(req.body.password, user.passwordDigest))) {
            res.status(404).json({
                message: `Could not find a user with the provided username and password`
            });
        } else {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
            res.json({ user: user, token: token });
        }
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: "An error occurred" });
    }
});

const checkAuthentication = (async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.decode(token, process.env.JWT_SECRET);

        if (!decodedToken || !decodedToken.id) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const { id } = decodedToken;

        const user = await User.findOne({
            where: { id: id }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: "An error occurred" });
    }
});

module.exports = {authenticateUser, checkAuthentication};
