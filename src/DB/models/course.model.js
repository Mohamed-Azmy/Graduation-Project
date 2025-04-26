import mongoose from  "mongoose"




export const enumLevel={
    level2:"level2",
    level3:"level3",
    level4:"level4"
}

export const enumSemster={
  semster1:"first",
  semster2:"second"
}


export const enumVideo={
  lec:"lec",
  sec:"sec"
}

export const courseSchema = new mongoose.Schema({
  courseName: {
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
  semster:{
    type: String,
    required: true,
    enum: Object.values(enumSemster)

  },
  level: {
    type: String,
    required: true,
    enum: Object.values(enumLevel)
  },
  videoType:{
    type:String,
    required:true,
    enum:Object.values(enumVideo),
  },
  doctorId:[
    {
      type: mongoose.Schema.Types.ObjectId,
    }
  ]
});



export const courseModel= mongoose.model.course || mongoose.model('course',courseSchema);