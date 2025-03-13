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
        return next (new Error("token not found",{cause:404}))}
    const decoded =  await verifyToken({key:authorization,SIGNATURE : process.env.SIGNATURE_TOKEN})
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