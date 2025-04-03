import { userModel } from "../../DB/models/users.model.js";





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


