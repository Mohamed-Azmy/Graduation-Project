import bcrypt from "bcryptjs"


export const comaprePAssword = async({Key,hash}) =>{
    return bcrypt.compareSync(Key,hash)
}