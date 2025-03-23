import mongoose from "mongoose";
import { eventEmitter } from "../../utils/emailEvents/index.js";
import { asyncHandler, hashPassword } from "../../utils/index.js";
import { addDoctor, findByEmail } from "./DBquery.js";
import { enumRole } from "../../DB/models/users.model.js";
import { academicPassword } from "../../service/generatPass.js";
import { academicEmail } from "../../service/generatEmails.js";



export const addDoctorByAdmin = asyncHandler(async(req,res,next)=>{
    const {firstName,lastName,gmail} = req.body ;
    if(!gmail){
        return next(new Error("email is required", { cause: 400 }));
    }
    const newPassword = await academicPassword();
    let newEmail = await academicEmail();
    let boolean = true ;
    while(boolean){
        let emailExist = await findByEmail({ email : newEmail });
        if(!emailExist){
            boolean = false ;
            break;
        }
        newEmail = await academicEmail();
    }
    eventEmitter.emit("sendEmail",{email :gmail , newEmail , newPassword}) ;
    const passwordHash = await hashPassword({ key : newPassword , SALT_ROUNDS: process.env.SALT_ROUNDS })
    const id = new mongoose.Types.ObjectId();
    const newDoctor = {
        _id:id,
        firstName : firstName,
        lastName : lastName,
        email: newEmail,
        password : passwordHash,
        role: enumRole.doctor
    }
    await addDoctor({ data: newDoctor });
    return res.status(200).json({ message: "success" });
    })
