import crypto from "crypto-js"

export const Decrypt = (key,SECRIT_KEY=process.env.SECRIT_KEY)=>{
    return crypto.AES.decrypt(key,SECRIT_KEY).toString(crypto.enc.Utf8)
}
