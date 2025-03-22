import mongoose from "mongoose"; 

export const enumRole={
  admin:"admin",
  student:"student",
  doctor:"doctor"
}

export const userSchema= new mongoose.Schema({
  firstName:{
    type:String,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [20, "Name must be less than 20 characters"]
    
  },
  lastName:{
    type:String,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [20, "Name must be less than 20 characters"],
    
  
  },
  email:{
    type:String,
    // match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/, "invalid email"],
    unique: true
  },
  password:{
    type:String
  },
  role:{
    type:String,
    enum: Object.values(enumRole),
    required: true
  }
})



export const userModel= mongoose.model.user || mongoose.model('user',userSchema)