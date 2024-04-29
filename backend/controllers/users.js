import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const UserController = {

    registerUser: async (req, res) => {
        try {
          // Extract user data from request body
          const { firstName, lastName, email, password } = req.body;
          console.log(req.body)
          // Create a new user in the database
          const newUser = await User.create({
            firstName,
            lastName,
            email,
            passwordDigest: await bcrypt.hash(password, 10)
          });
    
          // Send a success response
          res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
          // Handle errors
          console.error('Error registering user:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      },
    
      // Authenticate user login
      loginUser: async (req, res) => {
        try {
          const { email, password } = req.body;
          const user = await User.findOne({ where: { email, password } }); // Check if both email and password match directly
          if (!user) {
            return res.status(401).json({ message: 'Authentication failed' }); // Send an error if no match is found
          }
          res.json({ message: 'Login successful', user: { firstName: user.firstName } }); // Send success message and user's first name
        } catch (error) {
          console.error('Error logging in user:', error);
          res.status(500).json({ message: 'Internal server error' }); // Handle server errors
        }
      },
      
      
    
      // Get user by ID
      getUserById: async (req, res) => {
        try {
          const userID = req.params.id
          res.send(userID)
        } catch (error) {
          // Handle errors
          console.error('Error fetching user by ID:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      },

}
export default UserController

