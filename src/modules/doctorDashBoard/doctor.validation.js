import joi from "joi";
import { generalRules } from "../../utils/index.js";

export const doctorDashBoardValidation = {
    body: joi.object({
        fileName: joi.string().required(),
        courseTitle: joi.string().required()
    }),
    file: joi.object().required(),
    headers: generalRules.headers.required().unknown(true)
};


export const deleteSchemaFile = {
    body: joi.object({
        fileId: joi.string().length(25).required()
    }),
    file: joi.object().required(),
    headers: generalRules.headers.required().unknown(true)
};