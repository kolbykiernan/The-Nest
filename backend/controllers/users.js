import express from 'express';
import bcrypt from 'bcryptjs';
import Users from '../models/Users.js';

const user = express.Router();

user.post('/', async (req, res) => {
    let { password, ...rest } = req.body;
    const user = await Users.create({
        ...rest,
        passwordDigest: await bcrypt.hash(password, 10)
    })
    res.json(user)
})


user.get('/', async (req, res) => {
    const users = await Users.findAll()
    res.json(users)
})

export default user