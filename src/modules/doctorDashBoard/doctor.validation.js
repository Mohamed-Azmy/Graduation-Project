import joi from "joi";

export const doctorDashBoardValidation = {
    body: joi.object({
        fileName: joi.string().required(),
        courseTitle: joi.string().required()
    }),
    file: joi.object().required()
}