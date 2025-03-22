import { EventEmitter } from "events";
import {  sendEmails ,acadmicPassword  ,acadamicEmail } from "../../service/index.js";



export const eventEmitter = new EventEmitter();


eventEmitter.on("sendEmail", async ({email} )=>{
    await sendEmails( {email,subject : "welcome " , html :`<a href='acadamicEmail :${acadamicEmail}'
        , acadmicPassword = ${acadmicPassword}> good luck </a>`} )

})