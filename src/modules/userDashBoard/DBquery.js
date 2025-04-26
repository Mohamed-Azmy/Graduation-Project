import { courseModel } from "../../DB/models/course.model.js";
import { userModel } from "../../DB/models/users.model.js";


export const findByEmail = async ({ email }) => {
    return await userModel.findOne({ email });
};


export const addStudent = async ({ data }) => {
    const user = await new userModel(data);
    return await user.save();
}


export const findByObjects =async({level,semster})=>{
    return await courseModel.find({level,semster})
}

export const findByLectures =async({lec:subjectId})=>{
    return await courseModel.find({lec:subjectId})
}

export const findByVideos =async({_id:videoId})=>{
    return await courseModel.find({_id:videoId})
}

export const findBySections =async({sec:subjectId})=>{
    return await courseModel.find({sec:subjectId})
}






