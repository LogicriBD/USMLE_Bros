import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporterVerify = (transporter:any) : Promise<boolean> => {
    return new Promise((resolve, reject) => {
        transporter.verify(function (error:any) { 
            if(error){
                console.log(error);
                return reject(false);
            }else {
                return resolve(true);
            }
        });
    });
};

export async function POST(req: NextRequest) { 
    const { message, receiver, subject} = await req.json();

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        auth : {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        tls: {
            rejectUnauthorized: false,
        }
    });

    if(!(await transporterVerify(transporter))){
        return NextResponse.json({ message: 'Server is not ready to take our messages' }, { status: 500 });
    }

    try{
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: receiver,
            subject: subject,
            text: message,
        });

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    }catch(error:any) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
    }
};