import { userModel } from "../../DB/models/users.model.js";
import { courseModel } from "../../DB/models/course.model.js";
import e from "express";






export const findByEmail = async ({ email }) => {
    return await userModel.findOne({ email });
};

export const addDoctor = async ({ data }) => {
    const user = await new userModel(data);
    return await user.save();
}


export const findAllDoctors = async ({role})=>{
    return await userModel.find({role})
}


export const updateDoctor = async({_id},{password}) =>{
    return await userModel.findByIdAndUpdate({_id},{password})
}
export const deleteDoctor = async({_id})=>{
    return await userModel.findByIdAndDelete({_id})
}

export const findByCourse = async ({courseCode}) => {
    return await   courseModel.findOne({ courseCode });
};

export const addCourse = async ({courseName,courseCode , doctorId}) => {
    const course = await new subjectModel({courseName,courseCode , doctorId});


    return await course.save();
}

export const getAllCoursesFromDB = async () => {
    return await courseModel.find();
}

export const deleteCourse = async({_id})=>{
    return await courseModel.findByIdAndDelete({_id})
}

