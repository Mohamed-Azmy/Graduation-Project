import { contentModel, enumVideo } from "../../DB/models/content.model.js";
import { courseModel } from "../../DB/models/course.model.js";
import { userModel } from "../../DB/models/users.model.js";


export const findByEmail = async ({ email }) => {
    return await userModel.findOne({ email });
};

export const findCourseById = async (id) => {
    return await courseModel.findById(id);
};

export const findContent = async () => {
    return await contentModel.find().sort({createdAt:-1}).limit(4);
};


export const addStudent = async ({ data }) => {
    const user = await new userModel(data);
    return await user.save();
}


export const findByObjects =async(filterQuery= {})=>{
    return await courseModel.find(filterQuery);
}

export const findByLectures =async({courseId, videoType })=>{
    return await contentModel.find({courseId, videoType}).select("_id fileName numOfLec");
}

export const findByVideos =async({videoId})=>{
    return await contentModel.find({_id:videoId})
}
