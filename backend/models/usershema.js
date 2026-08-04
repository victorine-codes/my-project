import mongoose from"mongoose"
const userschema=new mongoose.schema({
    firsName:{
        type: string,
        required:true
    },
    lastsName:{
        type: string,
        required:true
    },
    email:{
        type: string,
        required:true,
        unique:true
    },
    Password:{
        type: string,
        required:true
    },
   
    
})