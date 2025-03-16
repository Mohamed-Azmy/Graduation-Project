import joi from "joi";
import { Types } from "mongoose";



export const customId = (value,healper)=>{
    let id =  Types.ObjectId.isValid(value);
    return id ? value : healper.massege(`id is not valid: ${value}`);
}



export const generalRules ={
    objectId:joi.string().custom(customId),
    email:joi.string().email({tlds:{allow:true}}),
    password:joi.string().regex(/^(?=.*\d)(?=.*[a-zA-Z]).{8,15}$/).required(),
    headers:joi.object({
        authorization:joi.string().required(),
        'cache-control': joi.string(),
        'postman-token': joi.string(),
        'content-type': joi.string(),
        'content-length': joi.string(),
        host: joi.string(),
        'user-agent': joi.string(),
        accept: joi.string(),
        'accept-encoding': joi.string(),
        connection: joi.string(),
    })
}
