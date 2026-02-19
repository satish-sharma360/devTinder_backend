import express from 'express'
import {validateUserdata} from '../utils/validator.js';
import { comparePassword, hashPassword } from '../service/passwordService.js';
import userModel from '../models/user.model.js';
import { generateToken } from '../service/tokenService.js';

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
    try {
        // validation
        validateUserdata(req)

        const { firstName, lastName, emailId, password } = req.body;

        // Hash the password
        const hashedPass = await hashPassword(password)

        // creating a new instance of the user model

        const user = new userModel({
            firstName, lastName, emailId, password: hashedPass
        })

        const savedUser = await user.save()

        const token = await generateToken({id:savedUser._id})

        res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) })

        res.send({ message: 'User Added successfully!', data: savedUser })
    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }

})

authRouter.post('/login' , async (req,res) => {
    try {
        const {emailId , password} = req.body;
        console.log("hello" ,emailId , password)

        const user = await userModel.findOne({emailId:emailId})

        if(!user){
            throw new Error('Invalid credentials')
        }

        // compare pssword

        const isMatch = await comparePassword(password, user.password)

        if(!isMatch){
            throw new Error('Invalid credentials')
        }

        const token = await generateToken({id:user._id})

        res.cookie("token", token,{expires:new Date(Date.now() + 8 * 3600000)})

        res.send(user)
    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
})

authRouter.post('/logout', (req,res) =>{
    res.cookie('token' ,null , {expires: new Date(Date.now())})
    res.send("Logout Successfully!!")
})

export default authRouter;