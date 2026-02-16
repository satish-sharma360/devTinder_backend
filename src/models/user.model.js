import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        minlength:4
    },
    lastName:{
        type:String,
        require:true
    },
    emailId:{
        type:String,
        lowercase:true,
        true:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    age:{
        type:Number
    },
    gender:{
        type:String,
        validate(value){
            if(!['Male','Female','Others'].includes(value)){
                throw new Error('Gender data is not valid')
            }
        }
    },
    photoUrl:{
        type:String
    },
    about:{
        type:String,
        default:'This is a default about of the user!'
    },
    skills:{
        type:[String]  
    }
},{timestamps:true})

export default mongoose.model('user',userSchema)