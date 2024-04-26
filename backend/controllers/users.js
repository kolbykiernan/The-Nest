import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const user = express.Router();

user.post('/users', async (req, res) => {
    let { password, ...rest } = req.body;
    const user = await User.create({
        ...rest,
        passwordDigest: await bcrypt.hash(password, 10)
    })
    res.json(user)
})


user.get('/users', async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})

export default user