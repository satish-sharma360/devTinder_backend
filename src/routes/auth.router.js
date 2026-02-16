import express from 'express'
import validateUserdata from '../utils/validator.js';

const authRouter = express.Router();

authRouter.post('/signup',(req,res)=>{
    // validation
    validateUserdata(req)

    const {firstName , lastName , emailId , password} = req.body;

    // Hash the password
    

})

export default authRouter;