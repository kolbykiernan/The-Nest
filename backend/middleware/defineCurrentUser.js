import User from '../models/User.js';
import jwt from "jsonwebtoken";

// Middleware to define current user
async function defineCurrentUser(req, res, next){
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer')) {
            const token = authHeader.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const { id } = decodedToken;
            const user = await User.findOne({ 
                where: {
                    userId: id
                }
            });
            req.currentUser = user;
        }
    } catch(err){
        req.currentUser = null;
    }
    next();
}

export default defineCurrentUser;
