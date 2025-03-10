import mongoose from  "mongoose";


export const subjectSchema= new mongoose.Schema({

    courseTitle:{
        type:string
    },
    courseCode:{
        type:string
    },
    level:{
        type:string
    }
})



export const subjectModel= mongoose.model.subject || mongoose.model('subject',subjectSchema);