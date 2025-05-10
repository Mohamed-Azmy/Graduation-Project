import mongoose from "mongoose";

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
    numOfLec: {
        type: Number,
        required: true
    },
    fileName:{
        type:String,
        required:true
    },
    videoUrl:{
        type:String,
        match: [/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/],
        required:true
    },
    videoId:{
        type:String,
        required:true
    }
},{timestamps:true})


export const contentModel= mongoose.model.content || mongoose.model('content', contentSchema)