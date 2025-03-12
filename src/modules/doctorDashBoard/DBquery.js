import { contentModel } from "../../DB/models/content.model.js";


export const addFiles=async({data})=>{
    return await data.save();

}