import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {

  try {
    const services = await db.service.findMany();
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({
      status: 500,
      statusText: 'Internal Server Error',
    }, { status: 500 });
  }
}
