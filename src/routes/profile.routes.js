import {Router} from 'express'
import userModel from '../models/user.model.js';
import authMiddleware from '../middleware/auth.js';
import { validateEditProfileData } from '../utils/validator.js';

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

profileRoute.patch('/edit' ,authMiddleware, async (req,res) =>{
    try {

        if(!validateEditProfileData){
            throw new Error('Invalid Edit Request')
        }
        
        const loggedInUser = await userModel.findById({_id:req.user?.id})

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]))

        await loggedInUser.save();

        res.send({message:`${loggedInUser.firstName} , your profile updated successfully` , data: loggedInUser})
    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
})

export default profileRoute;