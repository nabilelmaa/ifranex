import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { pin } = await req.json();

    if (!pin || pin.length !== 6 || isNaN(pin)) {
      return NextResponse.json(
        { message: 'Invalid admin PIN format' },
        { status: 400 }
      );
    }

    const adminPin = await db.admin.findFirst();
    if (!adminPin) {
      const hashedPin = await bcrypt.hash(pin, 10);
      await db.admin.create({
        data: {
          pin: hashedPin,
        },
      });
      return NextResponse.json(
        { message: 'Admin PIN created' },
        { status: 200 }
      );
    }

    const isValidPin = await bcrypt.compare(pin, adminPin.pin);
    if (!isValidPin) {
      return NextResponse.json(
        { message: 'Invalid admin PIN' },
        { status: 401 }
      );
    }

    const token = jwt.sign({ userId: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
    return NextResponse.json(
      { token },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error managing admin PIN:', error);
    return NextResponse.json(
      { message: 'Oops...Something went wrong!' },
      { status: 500 }
    );
  }
};