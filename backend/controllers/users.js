// import express from 'express';
// import User from '../models/user.js';
// import bcrypt from 'bcryptjs'

// const usersRouter = express.Router();

// usersRouter.post('/', async (req, res) => {
//     let { password, ...rest } = req.body;
//     const user = await User.create({
//         ...rest,
//         passwordDigest: await bcrypt.hash(password, 10)
//     })
//     res.json(user)
// })


// usersRouter.get('/', async (req, res) => {
//     const users = await User.findAll()
//     res.json(users)
// })

// export default usersRouter