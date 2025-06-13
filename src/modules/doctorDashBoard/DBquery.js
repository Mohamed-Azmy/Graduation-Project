import { contentModel } from "../../DB/models/content.model.js";
import { userModel } from "../../DB/models/users.model.js";


export const addFiles = async ({ data }) => {
    const content = new contentModel(data);
    return await content.save();

}

