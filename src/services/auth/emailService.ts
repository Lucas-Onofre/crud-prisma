import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

type ConfirmationEmailInput = {
  email: string;
  name: string;
  token: string;
};

export const sendConfirmationEmail = async ({
  email,
  name,
  token,
}: ConfirmationEmailInput) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Hi there! To start using our app, please confirm your email',
    html: `
          <h1>Hi ${name}</h1>
          <p>Click the link below to confirm your email</p>
          <a href="http://localhost:3000/confirm/${token}">Confirm your email</a>
      `,
  };

  transporter.sendMail(mailOptions, (err: any, info: any) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });

  return true;
};
