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
  doctorId: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
      }
    ],
    validate: {
      validator: function (v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: "doctorId must contain at least one doctor."
    }
  }
});



export const courseModel= mongoose.model.course || mongoose.model('course',courseSchema);