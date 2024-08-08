import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

export const POST = async (req: NextRequest) => {
  try {
    const { pin } = await req.json();

    if (!pin || pin.length !== 6) {
      return NextResponse.json(
        { message: 'PIN is required and must be 6 digits long' },
        { status: 400 }
      );
    }

    const admin = await db.admin.findFirst();

    if (!admin || !(await bcrypt.compare(pin, admin.pin))) {
      return NextResponse.json(
        { message: 'Invalid PIN' },
        { status: 401 }
      );
    }


    const token = jwt.sign({ adminId: admin.id }, JWT_SECRET, { expiresIn: '24h' });

    return NextResponse.json(
      { token },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error during admin sign-in:', error);
    return NextResponse.json(
      { message: 'Oops...Something went wrong!' },
      { status: 500 }
    );
  }
};
