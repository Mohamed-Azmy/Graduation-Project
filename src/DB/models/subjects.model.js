import mongoose from  "mongoose";


export const enumLevel={
    level2:"level2",
    level3:"level3",
    level4:"level4"
}

export const subjectSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true,
    trim: true
  },
  courseCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
    
  },
  level: {
    type: String,
    required: true,
    enum: Object.values(enumLevel)
  },
});



export const subjectModel= mongoose.model.subject || mongoose.model('subject',subjectSchema);