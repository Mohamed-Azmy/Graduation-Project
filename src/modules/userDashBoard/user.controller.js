import Router from "express";
import { validation } from "../../middlewares/validation.js";
import * as SU from "./user.service.js";
import * as SV from "./user.validation.js";
import { authentication } from "../../middlewares/auth.js";
const userDashBoard = Router();




userDashBoard.post("/signup",validation(SV.signUpSchema),SU.signUp)
userDashBoard.post("/login" , validation(SV.loginSchema), SU.login)
userDashBoard.get("/getAllSubjects",authentication,SU.getAllSubjects)
userDashBoard.get("/lec/:level/:subjectId",authentication,SU.getAllLectures)
userDashBoard.get("/lec/:level/:subjectId/:videoId",authentication,SU.getAllVideos)

















export default  userDashBoard;