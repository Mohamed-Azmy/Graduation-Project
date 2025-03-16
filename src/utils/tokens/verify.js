import jwt from "jsonwebtoken"


export const verifyToken = async({token,SIGNATURE=process.env.SIGNRTURE_TOKEN})=>{
    return jwt.verify(token,SIGNATURE)
}
