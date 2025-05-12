import cloudinary from "../../utils/cloudinary/index.js"
import { asyncHandler } from "../../utils/globalErrorHandling/index.js"
import { addFiles } from "./DBquery.js"
import axios from "axios";
import { contentModel } from "../../DB/models/content.model.js";
import { courseModel } from "../../DB/models/course.model.js";
import extractYouTubeVideoId from "../../utils/extractUrls/index.js";

export const addFile = asyncHandler(async (req, res, next) => {

    const { fileName, numOfLec, videoUrl, courseTitle, courseId, videoType } = req.body;

    if (!req.user) {
        return next(new Error("user not authorized", { cause: 400 }))
    }

    const findCourse = await courseModel.findById(courseId);
    if (!findCourse) return next(new Error("course not found", { cause: 400 }));

    if (!req.file) {
        return next(new Error("you nust choose file", { cause: 400 }))
    }

    const videoId = extractYouTubeVideoId(videoUrl);
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "raw",
        folder: `E-Learning/Pdfs/${courseTitle}`,
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
            videoType,
            courseId,
            numOfLec,
            videoUrl,
            fileName,
            videoId
        }
    });

    return res.status(200).json({ message: "success" });
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
    const { fileId } = req.params;

    const findFile = await contentModel.findById(fileId);
    if (!findFile) return next(new Error("file not found", { cause: 400 }));

   return res.status(200).json({message:"success",file:findFile, videoStream: `https://www.youtube.com/embed/${findFile.videoId}`});
});