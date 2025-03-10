import mongoose from "mongoose"; 

 export const userSchema= new mongoose.Schema({
   firstName:{
    type:string,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [20, "Name must be less than 20 characters"]
   },
   lastName:{
    type:string,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [20, "Name must be less than 20 characters"]
  
   },
   email:{
    type:string,
    match:[  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "invalid email"]
   },
   password:{
    type:string,
    match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,"weak password"]
   },
   role:{
    enum:[student]

   }
 })



 export const userModel= mongoose.model.user || mongoose.model('user',userSchema)