import { Router } from "express";
import {multerCloudinary , fileTypes, validation, authentication, authorization} from "../../middlewares/index.js";
import { addFile } from "./doctor.service.js";
import { doctorDashBoardValidation } from "./doctor.validation.js";
import { enumRole } from "../../DB/models/users.model.js";

const doctorDashBoard= Router()





doctorDashBoard.post("/",multerCloudinary([...fileTypes.pdf,...fileTypes.video]).single("attachment"), authentication,authorization([enumRole.doctor]),validation(doctorDashBoardValidation),addFile);





export default doctorDashBoard;

