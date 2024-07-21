import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;

    const { status } = await req.json();


    if (status !== 'Canceled') {
      return NextResponse.json(
        { message: 'Invalid status' },
        { status: 400 }
      );
    }

    const updatedBooking = await db.booking.update({
      where: { id },
      data: {
        status: 'Canceled',
      },
    });

    return NextResponse.json(
      { booking: updatedBooking },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { message: 'Oops...Something went wrong!' },
      { status: 500 }
    );
  }
};
