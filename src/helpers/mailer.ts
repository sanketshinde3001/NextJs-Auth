import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from "bcryptjs";
require('dotenv').config();

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashToken = await bcryptjs.hash(userId.toString(), 10)
    console.log("here1");
    if (emailType === 'VERIFY') {
      console.log("here2");
      await User.findByIdAndUpdate(userId,
        {
          $set: { verifyToken: hashToken, verifyTokenExpiry: new Date(Date.now() + 360000) }
        });
        console.log("here3");
      }else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId,
        {$set:
        { forgotPasswordToken: hashToken, forgotPasswordTokenExpiry: Date.now() + 360000 }});
    }

    var transport = nodemailer.createTransport({
      service: 'gmail',
      host:'smtp.gmail.com',
      port:587,
      secure: false,
      auth: {
        user: process.env.Email,
        pass: process.env.Password,
      }
    });
    // var transport = nodemailer.createTransport({
    //   host: "sandbox.smtp.mailtrap.io",
    //   port: 2525,
    //   auth: {
    //     user: "12a88bdc37d9bd", //env
    //     pass: "eb164eb3e152e7" //env
    //   }
    // });

    console.log("here4",emailType)

    const mailOptions = {
      from: {
        name: 'Sanket Shinde',
        address: process.env.Email!,
      },
      to: email,
      subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password", // Subject line
      html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "forgotpass"}?token=${hashToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy paste the link below in your browser.<br>${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "forgotpass"}?token=${hashToken} </p>`, 
      // html: `<p>Click <a href="https://next-js-auth-virid.vercel.app/verifyemail?token=${hashToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy paste the link below in your browser.<br>https://next-js-auth-virid.vercel.app/verifyemail?token=${hashToken} </p>`,
    }
    // const mailOptions = {
    //   from: 'sanketshinde3123@gmail.com',
    //   to: email,
    //   subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password", // Subject line
    //   html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy paste the link below in your browser.<br>${process.env.DOMAIN}/verifyemail?token=${hashToken} </p>`, // html body
    // }

    const mailResponce = await transport.sendMail(mailOptions)

    return mailResponce;
  } catch (error) {

  }
}