import mongoose from "mongoose";
import { enumRole } from "../../DB/models/users.model.js";
import { asyncHandler, hashPassword, comparing, signToken } from "../../utils/index.js";
import { findByEmail, addStudent } from "./DBquery.js";
import { eventEmitter } from "../../utils/emailEvents/index.js";
import { academicPassword } from "../../service/generatPass.js";
import { academicEmail } from "../../service/generatEmails.js";




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


