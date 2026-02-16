import express from 'express'
import validateUserdata from '../utils/validator.js';
import { hashPassword } from '../service/passwordService.js';
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

        res.cookie("token", token, { expires: new Date() + 8 * 3600000 })

        res.send({ message: 'User Added successfully!', data: savedUser })
    } catch (error) {
        res.status(400).send("ERROR : " + err.message);
    }

})

export default authRouter;