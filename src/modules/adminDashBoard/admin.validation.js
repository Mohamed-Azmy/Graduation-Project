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
        cPassword:joi.string().valid(joi.ref('newPassword')),
        currentPassword:joi.string().required(),
    })
})

export const deleteDoctorSchema = ({
    body : joi.object({
        id : joi.string().required(),
    })
})

export const addCourseSchema = ({
    body : joi.object({
        courseName : joi.string().required(),
        courseCode : joi.string().required(),
        doctorId : joi.array().required(),
    })
})

export const deleteCourseSchema = ({
    body : joi.object({
        courseCode : joi.string().required(),
    })
})
