import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const PATCH = async (req: NextRequest) => {
  try {
    const { id, hidden } = await req.json();

    if (!id || hidden === undefined) {
      return NextResponse.json({ message: 'Service ID and hidden status are required' }, { status: 400 });
    }

    const service = await db.service.update({
      where: { id },
      data: { hidden },
    });

    return NextResponse.json({ message: 'Service visibility updated successfully', service }, { status: 200 });
  } catch (error) {
    console.error('Error updating service visibility:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
