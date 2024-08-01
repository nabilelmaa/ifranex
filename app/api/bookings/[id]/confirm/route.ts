// import { db } from '@/lib/db';
// import { NextRequest, NextResponse } from 'next/server';

// export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
//   try {
//     const { id } = params;

//     const { status } = await req.json();


//     if (status !== 'Confirmed') {
//       return NextResponse.json(
//         { message: 'Invalid status' },
//         { status: 400 }
//       );
//     }

//     const updatedBooking = await db.booking.update({
//       where: { id },
//       data: {
//         status: 'Confirmed',
//       },
//     });

//     return NextResponse.json(
//       { booking: updatedBooking },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error updating booking:', error);
//     return NextResponse.json(
//       { message: 'Oops...Something went wrong!' },
//       { status: 500 }
//     );
//   }
// };


import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const { status } = await req.json();

    if (status !== 'Confirmed') {
      return NextResponse.json(
        { message: 'Invalid status' },
        { status: 400 }
      );
    }

    const updatedBooking = await db.booking.update({
      where: { id },
      data: {
        status: 'Confirmed',
      },
      include: {
        service: true,
      },
    });

    const service_en = updatedBooking.service.description_en.toLowerCase()
    const service_fr = updatedBooking.service.description_fr.toLowerCase()

    await db.message.create({
      data: {
        content_en: `Your booking for ${service_en} has been confirmed for ${new Date(updatedBooking.createdAt).toLocaleString()}.`,
        content_fr: `Votre réservation pour ${service_fr} a été confirmée pour ${new Date(updatedBooking.createdAt).toLocaleString()}.`,
        bookingId: updatedBooking.id,
        userId: updatedBooking.customerId,
      },
    });

    return NextResponse.json(
      { booking: updatedBooking },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { message: 'Oops...Something went wrong!' },
      { status: 500 }
    );
  }
};