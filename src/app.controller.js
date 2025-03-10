import connectionDB from "./DB/connectionDB.js" 


const bootStrap=async(app,express)=>{

    app.use(express.json())


    connectionDB()



    app.use("*",(req,res,next)=>{
        return next (new(Error ("not found",{cause:404})))
    })

}


export default bootStrap