import { EventEmitter } from "events";
import {  sendEmails ,academicPassword  ,academicEmail } from "../../service/index.js";
import { newEmail, newPassword } from "../../modules/userDashBoard/user.service.js";



export const eventEmitter = new EventEmitter();


eventEmitter.on("sendEmail", async ({email} )=>{
    await sendEmails( { to : email},{subject : "welcome "} ,{ html :`<a href="#">Academic Email: ${newEmail},
        Academic Password: ${newPassword}</a>`} )
})
