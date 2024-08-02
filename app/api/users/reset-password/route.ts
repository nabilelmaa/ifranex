import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';

export const POST = async (req: NextRequest) => {
  try {
    const { email, verificationCode, password } = await req.json();

    if (!email || !verificationCode || !password) {
      return NextResponse.json({ message: 'Email, verification code, and new password are required' }, { status: 400 });
    }

    const storedVerificationCode = await db.verificationCode.findUnique({
      where: { email },
    });

    if (!storedVerificationCode || storedVerificationCode.code !== verificationCode) {
      return NextResponse.json({ message: 'Invalid verification code' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await db.user.update({
      where: { email },
      data: {
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        username: true,
        updatedAt: true,
      },
    });

    await db.verificationCode.delete({
      where: { email },
    });

    return NextResponse.json({ message: 'Password reset successfully', user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json({ message: 'Error resetting password' }, { status: 500 });
  }
};