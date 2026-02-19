import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        enum:{
            values:["ignore" ,"interested","accepted" ,"rejected"],
            message:`{values} is incorrect statrus type`
        }
    }
},{timestamps:true})

connectionSchema.pre('save',function (next){
    const connectionrequest = this;
    // check if the fromUserId is same as toUserId
    if(connectionrequest.fromUserId.equals(connectionrequest.toUserId)){
        throw new Error('You can not send connection request to yourself')
    }

    next()
})

export default mongoose.model('connectionModel' , connectionSchema)