import { userModel, enumRole } from "../../DB/models/users.model.js";
import { courseModel } from "../../DB/models/course.model.js";






export const findByEmail = async ({ email }) => {
    return await userModel.findOne({ email });
};

export const findDoctorById = async (id) => {
    return await userModel.findById(id);
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
    return await userModel.findByIdAndDelete({_id, role:enumRole.doctor})
}

export const findById = async ({courseId}) => {
    return await courseModel.findById(courseId);
};

export const addCourse = async ({courseName,courseCode , doctorId, level, semster}) => {
    const course = await new courseModel({courseName,courseCode , doctorId, level, semster});
    return await course.save();
}

export const findByCourse = async ({courseCode}) => {
    return await courseModel.findOne({ courseCode });
};

export const getAllCoursesFromDB = async () => {
    return await courseModel.find();
}

export const deleteCourse = async({_id})=>{
    return await courseModel.findByIdAndDelete( _id )
}

