import { Router } from "express";
import {multerCloudinary , fileTypes} from "../../middlewares/multer.js";
import { addFile } from "./dashBoard.service.js";

const doctorDashBoard= Router()





doctorDashBoard.post("/",multerCloudinary([...fileTypes.pdf,...fileTypes.video]).single("attachment"), addFile);





export default doctorDashBoard;

