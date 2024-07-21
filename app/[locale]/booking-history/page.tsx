"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/contexts/ToastContext";
import { BookingProps } from "@/types/index";
import { useLocale } from "next-intl";
import Image from "next/image";
import { hourglass } from "ldrs";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

const statusIcons: { [key: string]: string } = {
  Pending: "/pending.svg",
  Canceled: "/canceled.svg",
  Confirmed: "/confirmed-icon.svg",
  Completed: "/completed-icon.svg",
};

const BookingHistory: React.FC = () => {
  const [bookings, setBookings] = useState<BookingProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const locale = useLocale();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`/api/bookings/history?locale=${locale}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch booking history");
        }

        const data = await response.json();
        setBookings(data.bookings || []);
      } catch (error) {
        console.error(error);
        showToast(
          "Failed to fetch booking history. Please try again.",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [locale, showToast]);
  hourglass.register();
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 min-h-screen">
      <h2 className="text-3xl font-bold">Booking History</h2>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <l-hourglass
            size="40"
            bg-opacity="0.1"
            speed="1.75"
            color="black"
          ></l-hourglass>
        </div>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <Table>
          <TableCaption>Your recent bookings.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  {new Date(booking.bookingDate).toLocaleString()}
                </TableCell>
                <TableCell className="font-medium">{booking.title}</TableCell>
                <TableCell>{booking.description}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Image
                      src={statusIcons[booking.status]}
                      alt={booking.status}
                      width={20}
                      height={20}
                    />
                    <span>{booking.status}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default BookingHistory;
