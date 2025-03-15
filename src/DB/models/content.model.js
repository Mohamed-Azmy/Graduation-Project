import mongoose from "mongoose";


export const fileType = {
    video: "video",
    pdf: "pdf"
}
const contentSchema= new mongoose.Schema({
    file:{
        secure_url:String,
        public_id:String
    },
    courseTitle:{
        type: String,
        required:true
    },
    fileType: {
        type: String,
        enum: Object.values(fileType),
        required: true
    }
})


export const contentModel= mongoose.model.content || mongoose.model('content', contentSchema)