import { EventEmitter } from "events";
import {  sendEmails ,academicPassword  ,academicEmail } from "../../service/index.js";



export const eventEmitter = new EventEmitter();


eventEmitter.on("sendEmail", async ({email} )=>{
    await sendEmails( {email,subject : "welcome " , html :`<a href='academicEmail :${academicEmail}'
        , academicPassword : ${academicPassword}> good luck </a>`} )
})