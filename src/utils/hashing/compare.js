import bcrypt from "bcrypt"


export const comparing = async({Key,hashed}) =>{
    return bcrypt.compareSync(Key,hashed)
}