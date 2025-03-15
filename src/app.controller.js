import connectionDB from "./DB/connectionDB.js" 
import doctorDashBoard from "./modules/doctorDashBoard/dashBoard.controller.js"
import { globalErrorHandling } from "./utils/globalErrorHandling/index.js"
import cors from "cors";

const bootStrap=async(app,express)=>{

    app.use(express.json({ limit: "500mb" }));
    app.use(express.urlencoded({ limit: "500mb", extended: true }));

    app.use(cors());

    app.use("/doctor",doctorDashBoard)


    connectionDB()


    

    app.use("*",(req,res,next)=>{
        return res.status(404).json({msg:"not found"});
    })
    app.use(globalErrorHandling);
}


export default bootStrap