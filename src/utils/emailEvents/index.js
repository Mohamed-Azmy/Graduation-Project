import { EventEmitter } from "events";
import {  sendEmails } from "../../service/index.js";



export const eventEmitter = new EventEmitter();


eventEmitter.on("sendEmail", async ({email, newEmail,newPassword} )=>{
    await sendEmails( { to : email},{subject : "welcome "} ,{ html :`<a href="#">Academic Email: ${newEmail}<br>
        Academic Password: ${newPassword}</a>`} )
})
