import joi from "joi";
import { generalRules } from "../../utils/GeneralRules/index.js";




export const signUpSchema = {
    body : joi.object({
        firstName:joi.string().min(2).max(20).message({
            "string.min": "name is short",
            "string.max": "name is long"
            }),
            lastName:joi.string().min(2).max(20).message({
            "string.min": "name is short",
            "string.max": "name is long"
            }),
            email : generalRules.email.required(),
            password : generalRules.password.required() ,
            role:joi.string().valid("student").required() ,

        }).required() 


};


export const loginSchema = {
    body :joi.object({
        email:generalRules.email.required(),
        password:generalRules.password.required(),
    }).required() 
}