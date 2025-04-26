import Router from "express";
import { addDoctorByAdmin, getAllDoctorsByAdmin, updateDoctorDetalis, deleteDoctorByAdmin ,addCourseByAdmin ,getAllCoursesByAdmin  ,deleteCourseByAdmin } from "./admin.service.js";
import { validation } from "../../middlewares/validation.js";
import { addDoctorSchema, updateDoctorSchema } from "./admin.validation.js";
import { authentication, authorization } from "../../middlewares/auth.js";
import { enumRole } from "../../DB/models/users.model.js";

export const adminDashBoard = Router() ;



adminDashBoard.post("/addDoctors",authentication,authorization(enumRole.admin),validation(addDoctorSchema),addDoctorByAdmin)
adminDashBoard.get("/getAllDoctors",authentication,authorization(enumRole.admin),getAllDoctorsByAdmin)
adminDashBoard.patch("/updateDoctor",authentication,authorization(enumRole.admin),validation(updateDoctorSchema),updateDoctorDetalis)
adminDashBoard.delete("/deleteDoctor/:doctorId",authentication,authorization(enumRole.admin),deleteDoctorByAdmin)
adminDashBoard.post("/addCourse",authentication,authorization(enumRole.admin),addCourseByAdmin)
adminDashBoard.get("/getAllCourses",authentication,authorization(enumRole.admin),getAllCoursesByAdmin)
adminDashBoard.delete("/deleteCourse/:courseId",authentication,authorization(enumRole.admin),deleteCourseByAdmin)