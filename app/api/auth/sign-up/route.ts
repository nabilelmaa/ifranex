import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';


export const POST = async (req: NextRequest) => {
  try {
    const { email, verificationCode, username, password } = await req.json();

    if (!email || !verificationCode || !username || !password) {
      return NextResponse.json({ message: 'Email, verification code, username, and password are required' }, { status: 400 });
    }

    const storedVerificationCode = await db.verificationCode.findUnique({
      where: { email },
    });

    if (!storedVerificationCode || storedVerificationCode.code !== verificationCode) {

      return NextResponse.json({ message: 'Invalid verification code' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        profilePicture: '',
        username,
        email,  
        password: hashedPassword,
      },
    });

    await db.verificationCode.delete({
      where: { email },
    });

    return NextResponse.json({ message: 'User registered successfully', user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'User with this email already exists!' }, { status: 500 });
  }
};