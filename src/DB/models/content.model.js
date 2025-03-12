import mongoose from "mongoose";


const contentSchema= new mongoose.Schema({
    file:{
        secure_url:String,
        public_id:String
    },
    fileType:{
        type:String,
        required:true
    }
})
export const contentModel= mongoose.model.content || mongoose.model('content', contentSchema)