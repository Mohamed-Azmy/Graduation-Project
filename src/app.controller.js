import connectionDB from "./DB/connectionDB.js" 
import { adminDashBoard } from "./modules/adminDashBoard/admin.controller.js";
import doctorDashBoard from "./modules/doctorDashBoard/doctor.controller.js"
import userDashBoard from "./modules/userDashBoard/user.controller.js"
import { globalErrorHandling } from "./utils/globalErrorHandling/index.js"
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const bootStrap=async(app,express)=>{
    
    const limiter = rateLimit({
        windowMs: 2 * 60 * 1000, 
        max: 100, 
        message: "Too many requests from this IP, please try again later.",
      });

    app.use(express.json({ limit: "500mb" }));
    app.use(express.urlencoded({ limit: "500mb", extended: true }));
    app.use(helmet());

    app.use(cors('*'));

    app.use(limiter);

    app.use("/doctor",doctorDashBoard)
    app.use("/users",userDashBoard)
    app.use("/admin",adminDashBoard)


    connectionDB();

    app.get("/", (req, res) => {
        return res.status(200).json({ message: "Welcome to E-Lerning" });
    });

    app.use(globalErrorHandling);
    app.use("*",(req,res,next)=>{
        res.status(404).json({msg:"page not found"})
    })
}


export default bootStrap
