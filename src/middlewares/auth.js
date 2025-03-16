import { asyncHandler } from "../utils/globalErrorHandling/index.js";
import { verifyToken } from "../utils/token/verify.js";
import { userModel } from "../DB/models/users.model.js";

export const accessRoles ={
    admin:"admin",
    student:"student",
    doctor:"doctor"
}


export const authentication  = asyncHandler(async(req,res,next)=>{
    const {authorization} = req.headers ;
    if(!authorization){
        return next (new Error("invalid token",{cause:404}))}

        const {prefix,token} = authorization.split(" ") ;
        if (!prefix || !token ){
            return next (new Error("token or prefix not found",{cause:404}))
        }
        const SIGNATURE = undefined;
        if(prefix == "admin"){
            SIGNATURE = process.env.SIGNATURE_TOKEN_ADMIN
        }
        else if (prefix == "student"){
            SIGNATURE = process.env.SIGNATURE_TOKEN_STUDENT
        }
        else if (prefix == "doctor"){
            SIGNATURE = process.env.SIGNATURE_TOKEN_DOCTOR
        }
        else{
            return next (new Error("unkown prefix",{cause:404}))
        }

    const decoded =  await verifyToken({key:token,SIGNATURE : SIGNATURE})
    if (!decoded?.id){
        return next (new Error("invalid token",{cause:400}))
    }
    const user = await userModel.findById(decoded.id)
    if(!user){
        return next (new Error("user not found",{cause:400}))
    }
    req.user = user;
    next();
})


export const authorization =(accessRoles=[])=>{
    return asyncHandler(async(req,res,next)=>{
        if(!accessRoles.includes(req.user.role)){
            return next (new Error("Access denied",{cause:401}))
        }
        next();
    })

}