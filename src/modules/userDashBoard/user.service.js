import mongoose from "mongoose";
import { enumRole } from "../../DB/models/users.model.js";
import { asyncHandler, hashPassword, comparing, signToken } from "../../utils/index.js";
import { findByEmail, addStudent, findByObjects, findByLectures, findCourseById } from "./DBquery.js";
import { enumVideo } from "../../DB/models/content.model.js";




export const signUp = asyncHandler(async(req,res,next)=>{
    const {firstName ,lastName ,email, password} = req.body ;

    const user = await findByEmail({ email });


    if (user)
        return next(new Error("student already exist ", { cause: 404 }));
    const passwordHash = await hashPassword({ key : password , SALT_ROUNDS: process.env.SALT_ROUNDS })
    const id = new mongoose.Types.ObjectId();
    const newStudent = {
        _id:id,
        firstName:firstName,
        lastName:lastName,
        email: email,
        password:passwordHash,
        role: enumRole.student
    }
    await addStudent({ data: newStudent });
    return res.status(200).json({ message: "success" });
})


export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await findByEmail({ email });
    if (!user)
        return next(new Error("user not found", { cause: 404 }));

    const passwordMatch = await comparing({ Key: password, hashed: user.password });
    
    if (!passwordMatch)
        return next(new Error("wrong password", { cause: 400 }));

    const token = await signToken({ payload: { email, id: user._id }, SIGNATURE: process.env.SIGNRTURE_TOKEN });

    return res.status(200).json({ message: "success", token, role: user.role });
})


export const  getAllSubjects = asyncHandler(async(req,res,next)=>{
    let newObjects={};

    if(req.query?.level){
         newObjects.level=req.query.level
    }
    if(req.query?.semster){
        newObjects.semster=req.query.semster
    }
    const subjects = await findByObjects(newObjects);

    if(subjects.length === 0){
        return res.status(404).json({ message: "no subjects found" });
    }
    return res.status(200).json({ message: "success",subjects});
})

export const getAllLectures= asyncHandler(async(req,res,next)=>{
    const { subjectId }= req.params
    const findCourse = await findCourseById(subjectId);
    if(!findCourse) return res.status(404).json({ message: "course not found" });
    if(!subjectId){
        return next(new Error("subjects are required",{cause:400}))
    }
    const lectures= await findByLectures({courseId: subjectId, videoType: enumVideo.lec})

    return res.status(200).json({ message: "success",lectures});
})

export const getAllVideos = asyncHandler(async(req,res,next)=>{
    const {videoId}= req.params
    if(!videoId){
        return next (new Error("video is required"))
    }
    const videos= await findByVideos({_id:videoId})

    return res.status(200).json({ message: "success",videos});
})
