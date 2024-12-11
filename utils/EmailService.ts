import nodemailer from "nodemailer";
import { EmailMessage } from "../types/Email";

class EmailServiceImpl {
  private static instance: EmailServiceImpl;
  private transporter: nodemailer.Transporter;

  private constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: +process.env.SMTP_PORT!,
      secure: process.env.SMTP_TLS === "true",
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  public static getInstance(): EmailServiceImpl {
    if (!EmailServiceImpl.instance) {
      EmailServiceImpl.instance = new EmailServiceImpl();
    }

    return EmailServiceImpl.instance;
  }

  public async sendEmail(email: EmailMessage) {
    try {
      const receipients = await email.getRecipients();
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: receipients,
        subject: email.getSubject(),
        html: email.getMessage(),
      };

      return await this.transporter.sendMail(mailOptions);
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export const EmailService = EmailServiceImpl.getInstance();
