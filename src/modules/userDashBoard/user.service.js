import { userModel } from "../../DB/models/users.model.js";
import { asyncHandler } from "../../utils/globalErrorHandling/index.js";
import { hashPassword } from "../../utils/hashing/hash.js";
import {  comparing } from "../../utils/hashing/compare.js";
import { signToken } from "../../utils/token/sign.js";




export const signUp = asyncHandler(async(req,res,next)=>{
    const {firstName ,lastName ,email ,password} = req.body ;
 
    const user = await userModel.findOne({email}) ;

    if(!user){
        return next (new Error("student already exist ", {cause:404}))

    }
    const passwordHash = await hashPassword({key:password,SALT_ROUNDS:process.env.SALT_ROUNDS})

const newStudent = await userModel.create({
    firstName:firstName,
    lastName:lastName,
    email:email,
    password:passwordHash,
    role:"student"
})
return res.status(200).json ({message:"success",user:newStudent})
})


export const login = asyncHandler(async(req,res,next)=>{
    const {email ,password} = req.body ;
    const user = await userModel.findOne({email})
    if(!user){
        return next (new Error("user not found", {cause:404}))
    }

    const userPassword = user.password ;
    const passwordMatch = await comparing({Key:password,hashed:userPassword})
    
    if(!passwordMatch){
        return next (new Error("password not match",{cause:400}))

    }

    const token = await signToken({payload:{email,name:user.firstName+ " " +user.lastName ,id:user._id},
        SIGNATURE:process.env.SIGNRTURE_TOKEN})
        return res.status(200).json({message:"success",token})
})


