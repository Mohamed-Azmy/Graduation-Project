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
                chunk_size: 6000000,
                user_filename: true,
                unique_filename: false
            },
            (error, result) => {
                if (error) {
                    if (!responseSent) {
                        responseSent = true;
                        console.error("Upload error:", error);
                        return res.status(500).json({ error: "Upload failed" }); // ✅ استجابة واحدة فقط
                    }
                    return;
                }
    
                // حذف الملف بعد الرفع
                fs.unlink(filePath, (err) => {
                    if (err) console.error("Error deleting file:", err);
                });
    
                console.log("Upload finished successfully!");
    
                if (!responseSent) {
                    responseSent = true;
                    return res.json(result); // ✅ استجابة واحدة فقط
                }
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
    
        upload_stream.once("finish", () => {
            console.log("File uploaded successfully to Cloudinary!");
        });
    }
})

