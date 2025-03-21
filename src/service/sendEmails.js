import nodemailer from 'nodemailer';
import { asyncHandler } from '../utils/globalErrorHandling/index.js';

export const sendEmails = asyncHandler(async( to , subject , html )=>{
    const transporter  = nodemailer.createTransport({
        service: 'gmail' ,
        auth:{
            user : process.env.EMAIL,
            pass : process.env.PASSWORD
        }
    })
    const info  = await transporter.sendMail({
        from : process.env.EMAIL ,
        to : to ,
        subject ,
        html  
    })
    if(info.accepted.length){
        return true;
    }
    return false;
})