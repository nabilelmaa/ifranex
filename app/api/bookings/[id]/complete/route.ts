import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const sendCompletionEmail = async (email: string, username: string, serviceTitle: string) => {
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
    subject: 'Booking Completed',
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; color: #020617;">
          <h2 style="color: #020617; margin-bottom: 20px;">Booking Completed</h2>
          <p style="color: #020617; margin-bottom: 10px;">Dear ${username},</p>
          <p style="color: #020617; margin-bottom: 20px;">Your booking for <strong>${serviceTitle}</strong> has been successfully completed. Thank you for using our service!</p>
          <p style="color: #020617; margin-top: 20px;">We hope you had a great experience. If you have any feedback, feel free to reach out to us.</p>
          <p style="color: #020617; font-weight: bold; margin-top: 40px;">The Ifrane<span style="color: #4338ca;">X</span> Team</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending completion email:', error);
    throw new Error('Failed to send completion email.');
  }
};

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const { status } = await req.json();

    if (status !== 'Completed') {
      return NextResponse.json(
        { message: 'Invalid status' },
        { status: 400 }
      );
    }

    const updatedBooking = await db.booking.update({
      where: { id },
      data: {
        status: 'Completed',
      },
      include: {
        service: true,
      },
    });

    const serviceTitle = updatedBooking.service.title_en;
    const service_en = updatedBooking.service.title_en.toLowerCase();
    const service_fr = updatedBooking.service.title_fr.toLowerCase();

    await db.message.create({
      data: {
        content_en: `Your booking for ${service_en} has been completed. Thank you for using our service!`,
        content_fr: `Votre réservation pour ${service_fr} a été complétée. Merci d'utiliser notre service!`,
        bookingId: updatedBooking.id,
        userId: updatedBooking.customerId,
      },
    });

  
    const client = await db.user.findUnique({
      where: { id: updatedBooking.customerId },
      select: { email: true, username: true },
    });

    if (client) {
      await sendCompletionEmail(client.email, client.username, serviceTitle);
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
