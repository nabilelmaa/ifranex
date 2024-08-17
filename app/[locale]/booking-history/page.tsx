"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/contexts/ToastContext";
import { BookingProps } from "@/types/index";
import { useLocale, useTranslations } from "next-intl";
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
  const t = useTranslations("Tables");

  type Status = "Pending" | "Confirmed" | "Canceled" | "Completed";

  const statusMap: Record<Status, string> = {
    Pending: t("pending"),
    Confirmed: t("confirmed"),
    Canceled: t("canceled"),
    Completed: t("completed"),
  };

  const translateStatus = (status: Status): string => {
    return statusMap[status];
  };

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
      showToast(t("failed"), "error");
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
      showToast(t("booking_canceled"), "success");
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
    <div className="mt-12 max-w-4xl mx-auto p-6 space-y-6 min-h-screen">
      <h2 className="text-md lg:text-2xl md:text-xl font-semibold text-gray-800">
        {t("booking_history")}
      </h2>
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
        <p>{t("no_bookings")}</p>
      ) : (
        <Table>
          <TableCaption>{t("recent_bookings")}</TableCaption>
          <TableHeader>
            <TableRow className="bg-slate-100">
              <TableHead>{t("date")}</TableHead>
              <TableHead>{t("service")}</TableHead>
              <TableHead>{t("description")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead>{t("actions")}</TableHead>
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
                <TableCell className="w-32">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={statusIcons[booking.status]}
                      alt={booking.status}
                      width={20}
                      height={20}
                    />
                    <span>{translateStatus(booking.status as Status)}</span>
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
                      {t("cancel")}
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
              <AlertDialogTitle>{t("modal_title")}</AlertDialogTitle>
              <AlertDialogDescription>
                {t("modal_description")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setShowModal(false)}>
                {t("cancel")}
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-200 text-red-700 hover:bg-red-300"
                onClick={confirmCancel}
              >
                {t("confirm")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default BookingHistory;
