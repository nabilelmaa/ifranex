import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

interface Service {
  id: string;
  banner: string;
  pricePerHour: number;
  category: string;
  title_en: string;
  description_en: string;
  title_fr: string;
  description_fr: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'fr'; 
  const { userId } = await verifyToken(request);

  try {

    const bookings = await db.booking.findMany({
      where: {
        customerId: userId,
      },
      include: {
        service: true,
      },
      orderBy: {
        createdAt: 'desc', 
      },
    });


    const formattedBookings = bookings.map((booking) => {
      const title = booking.service[`title_${locale}` as keyof Service] || booking.service.title_en;
      const description = booking.service[`description_${locale}` as keyof Service] || booking.service.description_en;
      const bookingDate = new Date(booking.createdAt);
      if (isNaN(bookingDate.getTime())) {
        throw new Error("Invalid date format for booking createdAt");
      }
      return {
        id: booking.id,
        bookingDate: bookingDate.toISOString(),
        title,
        description,
        status: booking.status,
      };
    });

    return NextResponse.json({ bookings: formattedBookings }); 
  } catch (error) {
    console.error('Error fetching booking history:', error);
    return NextResponse.json({
      status: 500,
      statusText: 'Internal Server Error',
    }, { status: 500 });
  }
}
