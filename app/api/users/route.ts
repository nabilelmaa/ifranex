import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const users = await db.user.findMany({
    orderBy: {
        createdAt: "desc"
    }
  });
  return NextResponse.json({ users }, { status: 200 });
};