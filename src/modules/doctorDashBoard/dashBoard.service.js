import { contentModel } from "../../DB/models/content.model.js"
import cloudinary from "../../utils/cloudinary/index.js"
import { asyncHandler } from "../../utils/globalErrorHandling/index.js"
import { addFiles } from "./DBquery.js"
import fs from "fs";

export const addFile =asyncHandler( async(req,res,next)=>{
    const{fileType}=req.body;

    // if(!req.user){
    //     return next (new Error("user not authorized",{cause:400}))
    // }
    if(!req.file){
        return next(new Error("you nust choose file",{cause:400}))
    }
    let upload_stream;
    let uploadedSize=0;
    const totalSize = fs.statSync(req.file.path).size;
    if(req.file.mimetype==="video/mp4"){
        upload_stream = cloudinary.uploader.upload_stream(
            {
                resource_type: "video",
                folder: "E-Learning/videos",
                chunk_size: 6000000, // 6MB لكل جزء
                user_filename: true,
                unique_filename: false
            },
            (error, result) => {
                if (error) return res.status(500).send(error);

                fs.unlink(req.file.path, (err) => {
                    if (err) console.error("Error deleting file:", err);
                });
        
                return res.json(result);
            }
        );
        
        // قراءة الملف وضبط progress
        const fileStream = fs.createReadStream(req.file.path);
        fileStream.pipe(upload_stream);
        
        fileStream.on("data", (chunk) => {
            uploadedSize += chunk.length;
            const progress = ((uploadedSize / totalSize) * 100).toFixed(2);
            console.log(`Upload Progress: ${progress}%`);
        });
        upload_stream.once("finish",()=>{
            console.log("file Uploaded successfully")
        })
    }
    // else{
    //     upload_stream = cloudinary.uploader.upload_stream(
    //         { 
    //           resource_type: 'auto',
    //           folder: "E-Learning/pdfs",
    //           user_filename: true,
    //           unique_filename: false
    //         },
    //         (error, result) => {
    //           fs.unlinkSync(req.file.path);
      
    //           if (error) return res.status(500).send(error);
    //           return res.json(result);
    //         }
    //       );
    //       const fileStream = fs.createReadStream(req.file.path).pipe(upload_stream);
    //       fileStream.on("data", (chunk) => {
    //         console.log(`Received ${chunk.length} bytes`);
    //       });
    // }

    console.log(upload_stream);
    
    // const data =new contentModel({
    //     file:{
    //         secure_url,
    //         public_id
    //     },
    //     fileType
    // })

    // const saved= await addFiles({data})

    return res.status(200).json({msg:"success"})
})