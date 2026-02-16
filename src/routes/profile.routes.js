import {Router} from 'express'
import userModel from '../models/user.model.js';
import authMiddleware from '../middleware/auth.js';

const profileRoute = Router()

profileRoute.get('/view', authMiddleware , async (req,res) =>{
    try {
        const user = req.user;

        const userProfile = await userModel.findById({_id:user.id})

        res.send(userProfile)
    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
})

export default profileRoute;