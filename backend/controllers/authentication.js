import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const AuthenticationController = {

    // Authenticate user login
    authenticateUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Find the user by email
            const user = await User.findOne({ where: { email } });

            // Check if the user exists and the password is correct
            if (!user || !await bcrypt.compare(password, user.passwordDigest)) {
                return res.status(404).json({ message: 'Could not find a user with the provided username and password' });
            }

            // Generate JWT token
            const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET);

            // Send user data and token
            res.json({ user, token });
        } catch (error) {
            console.error('Error authenticating user:', error);
            res.status(500).json({ message: 'An error occurred' });
        }
    },

    // Get user profile
    getUserProfile: async (req, res) => {
        try {
            const authHeader = req.headers.authorization;

            // Check if Authorization header exists and starts with 'Bearer'
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // Extract token from Authorization header
            const token = authHeader.split(' ')[1];

            // Decode token to get user ID
            const decodedToken = jwt.decode(token, process.env.JWT_SECRET);

            // Check if token is valid and contains user ID
            if (!decodedToken || !decodedToken.id) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            // Find user by ID from token
            const { id } = decodedToken;
            const user = await User.findOne({ where: { userId: id } });

            // If user not found, send appropriate response
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Send user profile
            res.json(user);
        } catch (error) {
            console.error('An error occurred while fetching user profile:', error);
            res.status(500).json({ message: 'An error occurred' });
        }
    }
};

export default AuthenticationController;
