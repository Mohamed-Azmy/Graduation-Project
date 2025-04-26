import mongoose from "mongoose";
import { enumRole } from "../../DB/models/users.model.js";
import { asyncHandler, hashPassword, comparing, signToken } from "../../utils/index.js";
import { findByEmail, addStudent, findByObjects } from "./DBquery.js";




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

    return res.status(200).json({ message: "success", token });
})

let newObjects={
    level:"",
    semster:""
}
export const  getAllSubjects = asyncHandler(async(req,res,next)=>{

    if(req.query?.level){
         objects.level=req.query.level
    }
    if(req.query?.semster){
        objects.semster=req.query.semster
    }
    const subjects = await findByObjects({...newObjects})

    return res.status(200).json({ message: "success",subjects});

})
export const getAllLectures= asyncHandler(async(req,res,next)=>{
    const { subjectId}= req.params
    if(!subjectId){
        return next(new Error("subjects are required",{cause:400}))
    }
    const lectures= await findByLecture({lec:subjectId})

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


export const getAllSections= asyncHandler(async(req,res,next)=>{
    const { subjectId}= req.params
    if(!subjectId){
        return next(new Error("subjects are required",{cause:400}))
    }
    const sections= await findBySection({sec:subjectId})

    return res.status(200).json({ message: "success",sections});
})




