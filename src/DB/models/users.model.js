import mongoose from "mongoose"; 

export const enumRole={
admin:"admin",
student:"student",
doctor:"doctor"

}

 export const userSchema= new mongoose.Schema({
   firstName:{
    type:string,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [20, "Name must be less than 20 characters"]
    
   },
   lastName:{
    type:string,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [20, "Name must be less than 20 characters"],
    
  
   },
   email:{
    type:string,
    match:[  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "invalid email"],
    unique:true    
   },
   password:{
    type:string
   },
   role:{
    type:string,
    enum:Object.values(enumRole),
    required:true

   }
 })



 export const userModel= mongoose.model.user || mongoose.model('user',userSchema)