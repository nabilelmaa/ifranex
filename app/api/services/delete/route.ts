import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const DELETE = async (req: NextRequest) => {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: 'Service ID is required' }, { status: 400 });
    }

    const service = await db.service.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Service deleted successfully', service }, { status: 200 });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
