import Router from "express";
import { validation } from "../../middlewares/validation.js";
import * as SU from "./user.service.js";
import * as SV from "./user.validation.js";
import { authentication } from "../../middlewares/auth.js";
import { getFile } from "../doctorDashBoard/doctor.service.js";
const userDashBoard = Router();




userDashBoard.post("/signup",validation(SV.signUpSchema),SU.signUp)
userDashBoard.post("/login" , validation(SV.loginSchema), SU.login)
userDashBoard.get("/getAllSubjects",authentication,SU.getAllSubjects)
userDashBoard.get("/getAllSections",authentication,SU.getAllSubjects)
userDashBoard.get("/getAllSubjects/:subjectId",authentication,SU.getAllLectures)
userDashBoard.get("/getAllSections/:subjectId",authentication,SU.sections)
userDashBoard.get("/getAllSubjects/:subjectId/:videoId",authentication,SU.getAllVideos)
userDashBoard.get("/getAllSubjects/:subjectId/:videoId/:fileId",authentication,getFile)



 

export default  userDashBoard;