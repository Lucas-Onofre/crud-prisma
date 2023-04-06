import { logger } from '../../shared/utils/logger';
import { transporter } from '../../shared/utils/emailtransporter';

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

      <p>Thanks!</p>
    `,
  };

  try {
    transporter.sendMail(mailOptions, (err: any, info: any) => {
      if (err) {
        logger.error(err.message, { stack: err.stack });
      }
    });
  } catch (err: any) {
    logger.error(err.message, { stack: err.stack });
  }
};
