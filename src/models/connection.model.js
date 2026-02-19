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

export default mongoose.model('connectionModel' , connectionSchema)