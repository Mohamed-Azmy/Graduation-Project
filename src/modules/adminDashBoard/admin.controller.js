import Router from "express";
import { addDoctorByAdmin, getAllDoctorsByAdmin, updateDoctorDetalis } from "./admin.service.js";
import { validation } from "../../middlewares/validation.js";
import { addDoctorSchema, updateDoctorSchema } from "./admin.validation.js";
import { authentication } from "../../middlewares/auth.js";

export const adminDashBoard = Router() ;



adminDashBoard.post("/addDoctors",validation(addDoctorSchema),addDoctorByAdmin)
adminDashBoard.get("/getAllDoctors",getAllDoctorsByAdmin)
adminDashBoard.patch("/updateDoctor",validation(updateDoctorSchema),authentication,updateDoctorDetalis)