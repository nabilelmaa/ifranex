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
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; color: #fff;">
          <h2 style="color: #020617; margin-bottom: 20px;">Password Reset</h2>
          <p style="color: #020617; margin-bottom: 10px;">Dear User,</p>
          <p style="color: #020617; margin-bottom: 20px;">We received a request to reset your password. Please use the following code to proceed:</p>
          <p style="font-size: 24px; font-weight: bold; background-color: #f1f5f9 ; color: #020617; padding: 10px; border-radius: 8px; text-align: center;">${code}</p>
          <p style="color: #020617; margin-top: 20px;">If you did not request this, please ignore this email. Your password will remain unchanged.</p>
          <p style="color: #020617; font-weight: bold; margin-top: 40px;">The Ifrane<span style="color: #4338ca;">X</span> Team</p>
        </div>
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