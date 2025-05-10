import { Router } from "express";
import {multerCloudinary , fileTypes, validation, authentication, authorization} from "../../middlewares/index.js";
import { addFile, deleteFile, getFile } from "./doctor.service.js";
import { deleteSchemaFile, doctorDashBoardValidation } from "./doctor.validation.js";
import { enumRole } from "../../DB/models/users.model.js";

const doctorDashBoard= Router()





doctorDashBoard.post("/", authentication,multerCloudinary([...fileTypes.pdf]).single("attachment"), addFile);
doctorDashBoard.delete("/:fileId", authentication, authorization([enumRole.doctor]), validation(deleteSchemaFile), deleteFile);
doctorDashBoard.get("/:fileId", getFile);





export default doctorDashBoard;

