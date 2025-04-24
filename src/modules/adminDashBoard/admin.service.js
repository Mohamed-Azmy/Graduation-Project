import mongoose, { get } from "mongoose";
import { eventEmitter } from "../../utils/emailEvents/index.js";
import { asyncHandler, comparing, hashPassword } from "../../utils/index.js";
import { enumRole } from "../../DB/models/users.model.js";
import { academicPassword } from "../../service/generatPass.js";
import { academicEmail } from "../../service/generatEmails.js";
import { findByEmail,addDoctor , findAllDoctors, updateDoctor,deleteDoctor,findById,addCourse,getAllCoursesFromDB,deleteCourse, findByCourse} from "./DBquery.js"





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



    export const getAllDoctorsByAdmin = asyncHandler(async(req,res,next)=>{
        const doctors  = await findAllDoctors({role:enumRole.doctor});
        return res.status(200).json({ message: "success", doctors });
    })


    export const updateDoctorDetalis = asyncHandler(async(req,res,next)=>{
        const {currentPassword,newPassword, cPassword} = req.body ;
        const passwordCompare = await comparing({Key:currentPassword , hashed:req.user.password});
        if(!passwordCompare){
            return next(new Error("wrong password", { cause: 400 }));
        }
        if(newPassword !== cPassword){
            return next(new Error("passwords are not same", { cause: 400 }));
        }
        const passwordHash =  await hashPassword({key:newPassword , SALT_ROUNDS:process.env.SALT_ROUNDS})
        const doctor = await updateDoctor(
            {_id:req.user._id} ,
            {password:passwordHash}
            ,{new:true});
        return res.status(200).json({ message: "success" });
    })


    export const deleteDoctorByAdmin = asyncHandler(async(req,res,next)=>{
        const { doctorId } = req.params;
        const doctor = await deleteDoctor({_id: doctorId});
        if(!doctor){
            return next(new Error("doctor not found", { cause: 400 }));
        }
        
        return res.status(200).json({ message: "success" });
    })


export const addCourseByAdmin = asyncHandler(async(req,res,next)=>{
    const {courseName, courseCode , doctorId, level } = req.body ;
    const courseExist = await findByCourse({courseCode});
    if(courseExist){
        return next(new Error("course already exist", { cause: 400 }));
    }
    const newCourse = await addCourse({courseName,courseCode , doctorId, level});
    return res.status(200).json({ message: "success"});

})

export const getAllCoursesByAdmin = asyncHandler(async(req,res,next)=>{
    const courses = await getAllCoursesFromDB();
    return res.status(200).json({ message: "success", courses });
    
})

export const deleteCourseByAdmin = asyncHandler(async(req,res,next)=>{
    const {courseId} = req.params ;
    const courseExist = await findById({courseId});
    if(!courseExist){
        return next(new Error("course not found", { cause: 400 }));
    }
    await deleteCourse({_id : courseId});
    return res.status(200).json({ message: "success" });
})

