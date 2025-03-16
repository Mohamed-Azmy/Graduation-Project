import { userModel } from "../../DB/models/users.model.js";


export const findByEmail = async ({ email }) => {
    return await userModel.findOne({ email });
};


export const addStudent = async ({ data }) => {
    const user = await new userModel(data);
    return await user.save();
}