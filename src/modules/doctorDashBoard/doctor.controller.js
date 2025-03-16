import { Router } from "express";
import {multerCloudinary , fileTypes} from "../../middlewares/multer.js";
import { addFile } from "./doctor.service.js";
import { doctorDashBoardValidation } from "./doctor.validation.js";
import { validation } from "../../middlewares/validation.js";

const doctorDashBoard= Router()





doctorDashBoard.post("/",multerCloudinary([...fileTypes.pdf,...fileTypes.video]).single("attachment"), validation(doctorDashBoardValidation),addFile);





export default doctorDashBoard;

