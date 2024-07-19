// import { NextRequest, NextResponse } from 'next/server';
// import { db } from '@/lib/db';
// import nodemailer from 'nodemailer';
// import { verifyToken } from '@/lib/auth';

// interface BookingDetails {
//   serviceTitle: string;
//   id: string;
//   fullName: string;
//   address: string;
//   timing: string;
//   phoneNumber: string;
//   details: string;
//   createdAt: string;
//   customerId: string;
// }

// const sendBookingEmail = async (email: string, bookingDetails: BookingDetails) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: email,
//     subject: 'Booking Confirmation',
//     html: `
//       <div>
//         <p>Thank you for your booking!</p>
//         <h3>Booking Details:</h3>
//         <p>Full Name: ${bookingDetails.fullName}</p>
//         <p>Phone: ${bookingDetails.phoneNumber}</p>
//         <p>Timing: ${new Date(bookingDetails.timing).toLocaleString()}</p>
//         <p>Service: ${bookingDetails.serviceTitle}</p>
//         <p>Needs: ${bookingDetails.details}</p>
//         <p>If you have any questions, feel free to contact us.</p>
//         <p style="font-weight: bold; color: #4CAF50; font-size: 16px;">
//           Ifrane<span style="color: #000;">X.</span> <span style="color: #000;">Team</span>
//         </p>
//       </div>
//     `,
//   };

//   await transporter.sendMail(mailOptions);
// };

// export const POST = async (req: NextRequest) => {
//   try {
//     console.log('Verifying token...');
//     const { userId } = await verifyToken(req);
//     console.log('Token verified. User ID:', userId);

//     console.log('Parsing request body...');
//     const { fullName, phoneNumber, address, timing, needs, serviceTitle } = await req.json();

//     if (!fullName || !phoneNumber || !address || !timing || !needs || !serviceTitle) {
//       console.log('Missing required fields:', { fullName, phoneNumber, address, timing, needs, serviceTitle });
//       return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
//     }

//     console.log('Fetching user from database...');
//     const user = await db.user.findUnique({
//       where: { id: userId },
//       select: { email: true },
//     });

//     if (!user) {
//       console.log('User not found:', userId);
//       return NextResponse.json({ message: 'User not found' }, { status: 404 });
//     }

//     console.log('Creating booking in database...');
//     const booking = await db.booking.create({
//       data: {
//         fullName,
//         phoneNumber,
//         address,
//         timing: new Date(timing),
//         details: needs,
//         customerId: userId,
//       },
//     });

//     const bookingDetails: BookingDetails = {
//       ...booking,
//       serviceTitle,
//       timing: booking.timing.toISOString(),
//       createdAt: booking.createdAt.toISOString(),
//     };

//     console.log('Sending booking confirmation email...');
//     await sendBookingEmail(user.email, bookingDetails);

//     console.log('Booking created successfully:', booking);
//     return NextResponse.json({ message: 'Booking created successfully', booking }, { status: 201 });
//   } catch (error) {
//     console.error('Error creating booking:', error);
//     return NextResponse.json({ message: 'Unable to create booking', error: (error as any).message }, { status: 500 });
//   }
// };


import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import nodemailer from 'nodemailer';
import { verifyToken } from '@/lib/auth';
import { BookingDetails } from "@/types/index"

const sendBookingEmail = async (email: string, bookingDetails: BookingDetails) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Booking Confirmation',
    html: `
      <div>
        <p>Thank you for your booking!</p>
        <h3>Booking Details:</h3>
        <p>Full Name: ${bookingDetails.fullName}</p>
        <p>Phone: ${bookingDetails.phoneNumber}</p>
        <p>Timing: ${new Date(bookingDetails.timing).toLocaleString()}</p>
        <p>Service: ${bookingDetails.serviceTitle}</p>
        <p>Needs: ${bookingDetails.details}</p>
        <p>If you have any questions, feel free to contact us.</p>
        <p style="font-weight: bold; color: #4CAF50; font-size: 16px;">
          Ifrane<span style="color: #000;">X.</span> <span style="color: #000;">Team</span>
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const POST = async (req: NextRequest) => {
  try {
    console.log('Verifying token...');
    const { userId } = await verifyToken(req);
    console.log('Token verified. User ID:', userId);

    console.log('Parsing request body...');
    const { fullName, phoneNumber, address, timing, needs, serviceTitle, serviceId } = await req.json();

    if (!fullName || !phoneNumber || !address || !timing || !needs || !serviceTitle || !serviceId) {
      console.log('Missing required fields:', { fullName, phoneNumber, address, timing, needs, serviceTitle, serviceId });
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    console.log('Fetching user from database...');
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });

    if (!user) {
      console.log('User not found:', userId);
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    console.log('Creating booking in database...');
    const booking = await db.booking.create({
      data: {
        fullName,
        phoneNumber,
        address,
        timing: new Date(timing),
        details: needs,
        customerId: userId,
        serviceId: serviceId,
      },
    });

    const bookingDetails: BookingDetails = {
      ...booking,
      serviceTitle,
      timing: booking.timing.toISOString(),
      createdAt: booking.createdAt.toISOString(),
    };

    console.log('Sending booking confirmation email...');
    await sendBookingEmail(user.email, bookingDetails);

    console.log('Booking created successfully:', booking);
    return NextResponse.json({ message: 'Booking created successfully', booking }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ message: 'Unable to create booking', error: (error as any).message }, { status: 500 });
  }
};
