import nodemailer from 'nodemailer';

export const sendEmails = async( to , subject , html )=>{
    const transporter  = nodemailer.createTransport({
        service: 'gmail' ,
        auth:{
            user : process.env.USER_EMAIL,
            pass : process.env.USER_PASSWORD
        }
    })
    const info  = await transporter.sendMail({
        from : process.env.USER_EMAIL ,
        to : to.to ,
        subject : subject.subject,
        html  : html.html
    })
}