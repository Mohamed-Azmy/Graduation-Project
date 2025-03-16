import bcrypt from "bcryptjs"


export const comparing = async({Key,hashed}) =>{
    return bcrypt.compareSync(Key,hashed)
}