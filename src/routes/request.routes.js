import {Router} from 'express'
import authMiddleware from '../middleware/auth.js'
import connectionModel from '../models/connection.model.js';
import userModel from '../models/user.model.js';

const requestRouter = Router()

requestRouter.post('/request/send/:status/:toUserId', authMiddleware ,async (req,res) =>{
    try {
        const fromUserId = req.user?.id;
        if (!fromUserId) {
            throw new Error('Unable to determine requester id');
        }
        const toUserId = req.params.toUserId;

        const toUser = await userModel.findById(toUserId)
        if(!toUser){
            throw new Error('This user not present in DataBase')
        }
        const status = req.params.status;

        // 1-> user can only ignore and interested user cant accept and reject that why i keep this check 
        const allowedStatus = ["ignore" ,"interested"]

        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:'Invalid status type' + status})
        }

        // 2-> if single user again send connection request (if there is an existing connection request)
        // 3-> if xzy send connection request to abc and abc send connection request to xyz this should not valid
        const existingConnectionRequest = await connectionModel.findOne({
            $or:[{fromUserId ,toUserId},{fromUserId:toUserId ,toUserId:fromUserId}]
            // abc , xyz id already exist, abc:xyz , xyz:abc
        })

        if(existingConnectionRequest){
            throw new Error("Connection request already exist")
        }


        const connectioRequest = new connectionModel({
            fromUserId, toUserId , status
        })

        const data = await connectioRequest.save()

        res.send({message:'connection request send successfully', data})

    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
})


export default requestRouter
