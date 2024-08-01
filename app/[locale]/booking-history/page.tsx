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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";

import { Button } from "@/app/components/ui/button";

const statusIcons: { [key: string]: string } = {
  Pending: "/pending.svg",
  Canceled: "/canceled.svg",
  Confirmed: "/confirmed-icon.svg",
  Completed: "/completed-icon.svg",
};

const BookingHistory: React.FC = () => {
  const [bookings, setBookings] = useState<BookingProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const { showToast } = useToast();
  const locale = useLocale();

  useEffect(() => {
    fetchBookings();
  }, [locale, showToast]);

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
      showToast("Failed to fetch booking history. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = (id: any) => {
    setSelectedBookingId(id);
    setShowModal(true);
  };

  const confirmCancel = async () => {
    try {
      const response = await fetch(
        `/api/bookings/${selectedBookingId}/cancel`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Canceled" }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      showToast("Booking canceled successfully!", "success");
      await fetchBookings();
    } catch (error) {
      console.error("Error canceling booking:", error);
    } finally {
      setShowModal(false);
      setSelectedBookingId(null);
    }
  };
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
              <TableHead>Actions</TableHead>
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
                <TableCell>
                  {(booking.status === "Pending" ||
                    booking.status === "Confirmed") && (
                    <Button
                      variant="destructive"
                      className="py-1 px-4"
                      onClick={() => handleCancel(booking.id)}
                    >
                      Cancel
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {showModal && (
        <AlertDialog open={showModal} onOpenChange={setShowModal}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will cancel your booking.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setShowModal(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={confirmCancel}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default BookingHistory;
