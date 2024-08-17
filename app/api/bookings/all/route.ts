import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Service } from "@/types/index";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'fr'; 

  try {
    const bookings = await db.booking.findMany({
      include: {
        service: true,
        customer: {
          select: {
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc', 
      },
    });

    const formattedBookings = bookings.map((booking) => {
      const title = booking.service[`title_${locale}` as keyof Service] || booking.service.title_en;
      const bookingDate = new Date(booking.createdAt);
      if (isNaN(bookingDate.getTime())) {
        throw new Error("Invalid date format for booking bookingDate");
      }
      return {
        id: booking.id,
        createdAt: bookingDate.toISOString(),
        fullName: booking.fullName,
        phoneNumber: booking.phoneNumber,
        address: booking.address,
        timing: booking.timing,
        title,
        description: booking.details,
        status: booking.status,
        email: booking.customer.email,
      };
    });

    return NextResponse.json({ bookings: formattedBookings }); 
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({
      status: 500,
      statusText: 'Internal Server Error',
    }, { status: 500 });
  }
}