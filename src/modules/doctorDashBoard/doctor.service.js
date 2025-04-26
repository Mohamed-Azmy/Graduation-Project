import cloudinary from "../../utils/cloudinary/index.js"
import { asyncHandler } from "../../utils/globalErrorHandling/index.js"
import { addFiles } from "./DBquery.js"
import fs from "fs";
import { fileTypes } from "../../middlewares/multer.js";
import { fileType } from "../../DB/models/content.model.js";
import {io} from "../../../index.js";
import axios from "axios";
import { contentModel } from "../../DB/models/content.model.js";

export const addFile = asyncHandler(async (req, res, next) => {

    const { fileName, courseTitle, courseId, videoType } = req.body;

    if (!req.user) {
        return next(new Error("user not authorized", { cause: 400 }))
    }

    if (!req.file) {
        return next(new Error("you nust choose file", { cause: 400 }))
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
            async (error, result) => {
                if (error) {
                    return res.status(500).json({ error: "Upload failed" });
                }

                fs.unlink(filePath, (err) => {
                    if (err) return res.status(500).json({ error: "Failed to delete file" });
                })

                let { secure_url, public_id } = result;

                const addFile = await addFiles({
                    data: {
                        courseTitle,
                        file: {
                            secure_url,
                            public_id
                        },
                        fileType: fileType.video,
                        videoType,
                        courseId
                    }
                })

                return res.status(200).json({ message: "success" });
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
        let { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
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
                fileType: fileType.pdf,
                videoType,
                courseId
            }
        });
        return res.status(200).json({ message: "success" });
    } else
        return next(new Error("invalid file type", { cause: 400 }))
});


export const deleteFile = asyncHandler(async (req, res, next) => {

    const { fileId } = req.params

    if (!req.user)
        return next(new Error("user not authorized", { cause: 400 }))
    
    const file = await contentModel.findById(fileId)

    if (!file)
        return next(new Error("files not found or deleted", { cause: 400 }))

    await cloudinary.uploader.destroy(file.public_id)

    const deletedFile = await contentModel.findByIdAndDelete(fileId)

    return res.status(200).json({ message: "success", deletedFile });

});


export const getFile = asyncHandler(async (req, res, next) => {

    const { fileId } = req.params
    // if (!req.user)
    //     return next(new Error("user not authorized", { cause: 400 }))
    
    const file = await contentModel.findById(fileId)


    if (!file)
        return next(new Error("files not found or deleted", { cause: 400 }))

    const videoUrl = file.file.secure_url;
    const range = req.headers.range;

    if (!range) {
        return res.status(400).send("Requires Range header");
    }

    // نحصل على حجم الفيديو من Cloudinary
    const response = await axios.head(videoUrl);
    const videoSize = response.headers["content-length"];

    // تقسيم الفيديو إلى Chunks
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;

    // تجهيز الـ Headers للاستجابة
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);

    // طلب الجزء المطلوب فقط من Cloudinary
    const videoStream = await axios({
        url: videoUrl,
        method: "GET",
        responseType: "stream",
        headers: {
            Range: `bytes=${start}-${end}`,
        },
    });

    // بث البيانات للعميل
    videoStream.data.pipe(res);

});