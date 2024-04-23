import User from '../models/user.js';
import jwt from "jsonwebtoken";


async function defineCurrentUser(req, res, next){
    try {
        const [ method, token ] = req.headers.authorization.split(' ')
        if(method == 'Bearer'){
            const result = jwt.decode(process.env.JWT_SECRET, token)
            const { id } = result.value
            let user = await User.findOne({ 
                where: {
                    userId: id
                }
            })
            req.currentUser = user
        }
        next()
    } catch(err){
        req.currentUser = null
        next() 
    }
}

export default defineCurrentUser