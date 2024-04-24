// import express from 'express';
// import User from '../models/user.js';
// import bcrypt from 'bcryptjs';
// import jwt from "jsonwebtoken"

// const authenticationRouter = express.Router();


// authenticationRouter.post('/', async (req, res) => {
    
//     let user = await User.findOne({
//         where: { email: req.body.email }
//     })

//     if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
//         res.status(404).json({ 
//             message: `Could not find a user with the provided username and password` 
//         })
//     } else {   
//         const token = jwt.sign( { id: user.userId }, process.env.JWT_SECRET)
//         res.json({ user: user, token: token });
//     }
// })
  
// authenticationRouter.get('/profile', async (req, res) => {
//     try {

//         const [authenticationMethod, token] = req.headers.authorization.split(' ')

//         if (authenticationMethod == 'Bearer') {
//             const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

//             const { id } = decodedToken;

//             let user = await User.findOne({
//                 where: {
//                     userId: id
//                 }
//             })
//             res.json(user)
//         }
//     } catch (error) {
//         console.error("An error occurred:", error);
//         res.status(500).json({ message: "An error occurred" });
//     }
// });


// export default authenticationRouter;
