import nodemailer from 'nodemailer';

export const sendEmails = async( {to , subject , html} )=>{
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
        subject : subject,
        html  : html
    })
}