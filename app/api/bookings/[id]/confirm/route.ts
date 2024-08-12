import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const sendConfirmationEmail = async (email: string, username: string, serviceTitle: string, bookingTime: string) => {
  if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
    throw new Error('Email credentials are not set in environment variables.');
  }

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
    subject: 'Booking Confirmed',
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; color: #020617;">
          <h2 style="color: #020617; margin-bottom: 20px;">Booking Confirmation</h2>
          <p style="color: #020617; margin-bottom: 10px;">Dear ${username},</p>
          <p style="color: #020617; margin-bottom: 20px;">Your booking for <strong>${serviceTitle}</strong> has been confirmed for <strong>${bookingTime}</strong>.</p>
          <p style="color: #020617; margin-top: 20px;">We look forward to serving you. If you need to make any changes, please contact us.</p>
          <p style="color: #020617; font-weight: bold; margin-top: 40px;">The Ifrane<span style="color: #4338ca;">X</span> Team</p>
        </div>
      </div>
    `,
  };
  

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw new Error('Failed to send confirmation email.');
  }
};

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

    const serviceTitle = updatedBooking.service.title_en;
    const service_en = updatedBooking.service.description_en.toLowerCase();
    const service_fr = updatedBooking.service.description_fr.toLowerCase();
    const bookingTime = new Date(updatedBooking.createdAt).toLocaleString();

    await db.message.create({
      data: {
        content_en: `Your booking for ${service_en} has been confirmed for ${bookingTime}.`,
        content_fr: `Votre réservation pour ${service_fr} a été confirmée pour ${bookingTime}.`,
        bookingId: updatedBooking.id,
        userId: updatedBooking.customerId,
      },
    });

    const client = await db.user.findUnique({
      where: { id: updatedBooking.customerId },
      select: { email: true, username: true },
    });

    if (client) {
      await sendConfirmationEmail(client.email, client.username, serviceTitle, bookingTime);
    }

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
