// usersController.js

const { User } = require('../models');
const bcrypt = require('bcryptjs');

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
    let { password, ...rest } = req.body;
    const user = await User.create({
        ...rest,
        passwordDigest: await bcrypt.hash(password, 10)
    })
    res.json(user)
 }
  catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

module.exports = {
  getAllUsers,
  createUser
};
