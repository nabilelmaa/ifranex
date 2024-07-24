import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const reviews = await db.review.findMany({
    include: {
      user: true,
    },
    orderBy: {
      timestamp: 'desc',
    },
  });
  return NextResponse.json({ reviews }, { status: 200 });
};