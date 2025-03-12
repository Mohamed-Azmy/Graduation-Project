import mongoose from "mongoose";


const connectDB= async(req,res,next)=>{
    const connect = await mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("connected to mongodb")})
    .catch((err)=>{
        console.log("connection failed",err)})
}
export default connectDB;