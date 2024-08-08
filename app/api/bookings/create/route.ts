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
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; color: #020617;">
          <h2 style="color: #020617; margin-bottom: 20px;">Booking Confirmation</h2>
          <p style="color: #020617; margin-bottom: 10px;">Thank you for your booking! Below are the details of your appointment:</p>
          
          <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #020617; margin-bottom: 20px;">Booking Details</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #c7d2fe;">
                <td style="padding: 10px; color: #020617; font-weight: bold;">Full Name</td>
                <td style="padding: 10px; color: #020617;">${bookingDetails.fullName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #c7d2fe;">
                <td style="padding: 10px; color: #020617; font-weight: bold;">Phone Number</td>
                <td style="padding: 10px; color: #020617;">${bookingDetails.phoneNumber}</td>
              </tr>
              <tr style="border-bottom: 1px solid #c7d2fe;">
                <td style="padding: 10px; color: #020617; font-weight: bold;">Appointment Date & Time</td>
                <td style="padding: 10px; color: #020617;">${new Date(bookingDetails.timing).toLocaleString()}</td>
              </tr>
              <tr style="border-bottom: 1px solid #c7d2fe;">
                <td style="padding: 10px; color: #020617; font-weight: bold;">Service Booked</td>
                <td style="padding: 10px; color: #020617;">${bookingDetails.serviceTitle}</td>
              </tr>
              <tr>
                <td style="padding: 10px; color: #020617; font-weight: bold;">Special Requests</td>
                <td style="padding: 10px; color: #020617;">${bookingDetails.details}</td>
              </tr>
            </table>
          </div>
  
          <p style="color: #020617; margin-bottom: 20px;">If you have any questions or need to make changes, please feel free to contact us.</p>
          
          <p style="color: #020617; font-weight: bold; margin-top: 40px;">The Ifrane<span style="color: #4338ca;">X</span> Team</p>
        </div>
      </div>
    `,
  };
  
  
  

  await transporter.sendMail(mailOptions);
};

export const POST = async (req: NextRequest) => {
  try {
  
    const { userId } = await verifyToken(req);

    const { fullName, phoneNumber, address, timing, needs, serviceTitle, serviceId } = await req.json();

    if (!fullName || !phoneNumber || !address || !timing || !serviceTitle || !serviceId) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

  
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

    
    await sendBookingEmail(user.email, bookingDetails);


    return NextResponse.json({ message: 'Booking created successfully', booking }, { status: 201 });
  } catch (error) {
 
    return NextResponse.json({ message: 'Unable to create booking', error: (error as any).message }, { status: 500 });
  }
};
