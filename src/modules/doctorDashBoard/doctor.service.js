import cloudinary from "../../utils/cloudinary/index.js"
import { asyncHandler } from "../../utils/globalErrorHandling/index.js"
import { addFiles } from "./DBquery.js"
import fs from "fs";
import { fileTypes } from "../../middlewares/multer.js";
import { fileType } from "../../DB/models/content.model.js";
import { io } from "../../../index.js";

export const addFile = asyncHandler(async (req, res, next) => {

    const { fileName, courseTitle } = req.body;

    if(!req.user){
        return next (new Error("user not authorized",{cause:400}))
    }

    if(!req.file){
        return next(new Error("you nust choose file",{cause:400}))
    }

    let uploadedSize = 0;
    const filePath = req.file.path;
    const totalSize = fs.statSync(filePath).size;
    if (fileTypes.video.includes(req.file.mimetype)) {
        let upload_stream = cloudinary.uploader.upload_stream(
            {
                resource_type: "video",
                folder: `E-Learning/videos/${courseTitle}`,
                public_id: fileName,
                chunk_size: 20000000,
                unique_filename: false
            },
            async(error, result) => {
                if (error) {
                    console.error("Upload error:", error);
                    return res.status(500).json({ error: "Upload failed" });
                }

                fs.unlink(filePath, (err) => {
                    if (err) console.error("Error deleting file:", err);
                });

                let { secure_url, public_id } = result;

                const addFile = await addFiles({data:{
                    courseTitle,
                    file: {
                        secure_url,
                        public_id
                    },
                    fileType:fileType.video
                }
                })

                return res.status(200).json({message:"success"});
            }
        );

        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(upload_stream);

        fileStream.on("data", (chunk) => {
            uploadedSize += chunk.length;
            const progress = ((uploadedSize / totalSize) * 100).toFixed(2);
            io.emit("progress", progress);
        });
    } else if (fileTypes.pdf.includes(req.file.mimetype)) {
        let{secure_url,public_id} = await cloudinary.uploader.upload(req.file.path, {
            folder: `E-Learning/pdfs/${courseTitle}`,
            public_id: fileName,
            unique_filename: false
        })
        const addFile = await addFiles({
            data: {
                courseTitle,
                file: {
                    secure_url,
                    public_id
                },
                fileType:fileType.pdf
            }
        });
        return res.status(200).json({ message: "success" });
    } else
        return next(new Error("invalid file type",{cause:400}))
})


export const deleteFile = asyncHandler(async (req, res, next) => {

    const { fileId } = req.paramsك

    if(!req.user)
        return next (new Error("user not authorized",{cause:400}))
    
    const file= await contentModel.findById({fileId})

    if(!file)
        return next(new Error("files not found or deleted", { cause: 400 }))

    await cloudinary.uploader.destroy(file.public_id) 

    const deletedFile= await contentModel.findByIdAndDelete({fileId})

    return res.status(200).json({ message: "success",deletedFile });

})