import joi from "joi";
import { generalRules } from "../../utils/index.js";

export const doctorDashBoardValidation = {
    body: joi.object({
        fileName: joi.string().required(),
        courseTitle: joi.string().required()
    }),
    file: joi.object().required(),
    headers:generalRules.headers.required()
}