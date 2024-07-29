import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const POST = async (req: NextRequest) => {
  try {
    const { banner, pricePerHour, category, title_en, description_en, title_fr, description_fr, hidden } = await req.json();

    if (!banner || !pricePerHour || !category || !title_en || !description_en || !title_fr || !description_fr || hidden === undefined) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const service = await db.service.create({
      data: {
        banner,
        pricePerHour: parseFloat(pricePerHour),
        category,
        title_en,
        description_en,
        title_fr,
        description_fr,
        hidden,
      },
    });

    return NextResponse.json({ message: 'Service created successfully', service }, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
