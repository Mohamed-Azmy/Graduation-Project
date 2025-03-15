import crypto from "crypto-js"


export const Encrypt = (key,SECRIT_KEY=process.env.SECRIT_KEY)=>{
    return crypto.AES.encrypt(key,SECRIT_KEY).toString()
}

