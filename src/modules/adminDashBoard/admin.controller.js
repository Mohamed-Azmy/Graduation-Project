import Router from "express";
import { addDoctorByAdmin } from "./admin.service.js";
import { validation } from "../../middlewares/validation.js";
import { addDoctorSchema } from "./admin.validation.js";

export const adminDashBoard = Router() ;



adminDashBoard.post("/addDoctors",validation(addDoctorSchema),addDoctorByAdmin)