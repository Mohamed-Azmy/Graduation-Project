import mongoose from "mongoose";


export const fileType = {
    video: "video",
    pdf: "pdf"
}

export const enumVideo={
    lec:"lec",
    sec:"sec"
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
    },
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
        required:true
    },
    videoType:{
        type:String,
        required:true,
        enum:Object.values(enumVideo),
    },
    
},{timestamps:true})


export const contentModel= mongoose.model.content || mongoose.model('content', contentSchema)