import jwt from "jsonwebtoken"

export const signToken = async ({payload,SIGNATURE= process.env.SIGNRTURE_TOKEN})=>{
    return jwt.sign(payload,SIGNATURE)
}
