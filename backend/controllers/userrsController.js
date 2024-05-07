// usersController.js

const { User } = require('../models');

// Get all users
const getAllUsers = async (req, res) => {
    console.log("Fetching users...")
  try {
    const users = await User.findAll();
    console.log(users)
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, passwordDigest } = req.body;
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      passwordDigest
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

module.exports = {
  getAllUsers,
  createUser
};
