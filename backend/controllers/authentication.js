import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"

const authentication = express.Router();

authentication.post('/', async (req, res) => {
    
    let user = await User.findOne({
        where: { email: req.body.email }
    })

    if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
        res.status(404).json({ 
            message: `Could not find a user with the provided username and password` 
        })
    } else {   
        const token = jwt.sign( { id: user.userId }, process.env.JWT_SECRET)
        res.json({ user: user, token: token });
    }
})
  
authentication.get('/profile', async (req, res) => {
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
            where: { userId: id }
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



export default authentication;
