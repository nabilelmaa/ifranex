import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { Service, BookingProps, Message } from "@/types/index";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';
  const { userId } = await verifyToken(request);

  try {
    const messages = await db.message.findMany({
      where: {
        userId: userId,
      },
      include: {
        booking: {
          include: {
            service: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const formattedMessages = messages.map((message) => {
      const booking = message.booking as unknown as BookingProps & { service: Service };
      const title = booking.service[`title_${locale}` as keyof Service] || booking.service.title_en;
      const content = message[`content_${locale}` as keyof Message] || message.content_en || 'No content available';

      const messageDate = new Date(message.createdAt);
      if (isNaN(messageDate.getTime())) {
        throw new Error("Invalid date format for message createdAt");
      }

      return {
        id: message.id,
        content: content,
        createdAt: messageDate.toISOString(),
        bookingId: booking.id,
        serviceTitle: title,
        bookingStatus: booking.status,
      };
    });

    return NextResponse.json({ messages: formattedMessages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({
      status: 500,
      statusText: 'Internal Server Error',
    }, { status: 500 });
  }
}