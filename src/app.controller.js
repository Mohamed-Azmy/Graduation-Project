import connectionDB from "./DB/connectionDB.js" 
import doctorDashBoard from "./modules/doctorDashBoard/doctor.controller.js"
import userDashBoard from "./modules/userDashBoard/user.controller.js"
import { globalErrorHandling } from "./utils/globalErrorHandling/index.js"
import cors from "cors";

const bootStrap=async(app,express)=>{

    app.use(express.json({ limit: "500mb" }));
    app.use(express.urlencoded({ limit: "500mb", extended: true }));

    app.use(cors());

    app.use("/doctor",doctorDashBoard)
    app.use("/users",userDashBoard)



    connectionDB()


    

    app.use("*",(req,res,next)=>{
        return res.status(404).json({ msg: "Welcome to E-Learning" });
    })

    app.use(globalErrorHandling);
}


export default bootStrap