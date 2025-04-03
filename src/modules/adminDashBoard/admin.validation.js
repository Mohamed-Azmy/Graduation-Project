import joi from "joi";
import { generalRules } from "../../utils/index.js";



export const addDoctorSchema = ({
    body : joi.object({
        firstName : joi.string().required(),
        lastName : joi.string().required(),
        gmail :generalRules.email.required(),  
    })
})

export const updateDoctorSchema = ({
    body : joi.object({
        newPassword : generalRules.password.required(),
    })
})
