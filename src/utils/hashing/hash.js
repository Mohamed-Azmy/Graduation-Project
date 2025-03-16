import bcrypt from "bcrypt";


export const hashPassword = async({key,SALT_ROUNDS=process.env.SALT_ROUNDS})=>{
    return  bcrypt.hashSync(key,Number(SALT_ROUNDS))
}


