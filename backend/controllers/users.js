import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs'

const user = express.Router();


user.post('/', async (req, res) => {
    let { password, ...rest } = req.body;
    const user = await User.create({
        ...rest,
        passwordDigest: await bcrypt.hash(password, 10)
    })
    res.json(user)
})


user.get('/', async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})

export default user