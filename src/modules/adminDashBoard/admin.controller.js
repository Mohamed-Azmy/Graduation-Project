import Router from "express";
import { addDoctorByAdmin, getAllDoctorsByAdmin, updateDoctorDetalis, deleteDoctorByAdmin ,addCourseByAdmin ,getAllCoursesByAdmin  ,deleteCourseByAdmin } from "./admin.service.js";
import { validation } from "../../middlewares/validation.js";
import { addDoctorSchema, updateDoctorSchema } from "./admin.validation.js";
import { authentication } from "../../middlewares/auth.js";

export const adminDashBoard = Router() ;



adminDashBoard.post("/addDoctors",validation(addDoctorSchema),addDoctorByAdmin)
adminDashBoard.get("/getAllDoctors",getAllDoctorsByAdmin)
adminDashBoard.patch("/updateDoctor",validation(updateDoctorSchema),authentication,updateDoctorDetalis)
adminDashBoard.delete("/deleteDoctor",authentication,deleteDoctorByAdmin)
adminDashBoard.post("/addCourse",authentication,addCourseByAdmin)
adminDashBoard.get("/getAllCourses",authentication,getAllCoursesByAdmin)
adminDashBoard.delete("/deleteCourse",authentication,deleteCourseByAdmin)