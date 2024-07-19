import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import nodemailer from 'nodemailer';

const generateVerificationCode = (): string => {
  const min = 1000;
  const max = 9999;
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
};

const sendVerificationEmail = async (email: string, code: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Email Verification',
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <h2 style="color: #4CAF50;">Email Verification</h2>
        <p>Dear User,</p>
        <p>Thank you for registering. Please use the following verification code to complete your sign-up process:</p>
        <p style="font-size: 24px; font-weight: bold; color: #000;">${code}</p>
        <p>If you did not request this code, please ignore this email.</p>
        <p style="font-weight: bold; color: #4CAF50; font-size: 16px;">
          Ifrane<span style="color: #000;">X.</span> <spanspan style="color: #000;">Team</span>
        </p>
      </div>
    `,
  };
  
  

  await transporter.sendMail(mailOptions);
};

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const verificationCode = generateVerificationCode();

    await db.verificationCode.upsert({
      where: { email },
      update: { code: verificationCode },
      create: { email, code: verificationCode },
    });

    await sendVerificationEmail(email, verificationCode);

    return NextResponse.json({ message: 'Verification code sent to your email' }, { status: 200 });
  } catch (error) {
    console.error('Error sending verification code:', error);
    return NextResponse.json({ message: 'Oops...Something went wrong!' }, { status: 500 });
  }
};