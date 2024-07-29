import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const PATCH = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    const {
      banner,
      pricePerHour,
      category,
      title_en,
      description_en,
      title_fr,
      description_fr,
      hidden,
    } = await req.json();

    console.log("Request ID:", id);
    console.log("Request Payload:", {
      banner,
      pricePerHour,
      category,
      title_en,
      description_en,
      title_fr,
      description_fr,
      hidden,
    });

    if (
      !id ||
      !banner ||
      pricePerHour === undefined ||
      !category ||
      !title_en ||
      !description_en ||
      !title_fr ||
      !description_fr
    ) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    const updatedService = await db.service.update({
      where: { id },
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

    return NextResponse.json(
      { message: 'Service updated successfully', updatedService },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
