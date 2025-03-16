import Router from "express";
import { validation } from "../../middlewares/validation.js";
import * as SU from "./user.service.js";
import * as SV from "./user.validation.js";
const userDashBoard = Router();




userDashBoard.post("/signup",validation(SV.signUpSchema),SU.signUp)
userDashBoard.post("/login" , validation(SV.loginSchema), SU.login)














export default  userDashBoard;