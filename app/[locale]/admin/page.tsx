"use client";
import { useState, useEffect } from "react";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/app/components/ui/select";
import { BookingProps } from "@/types/index";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@/app/components/ui/table";
import { useLocale } from "next-intl";

const AdminView = () => {
  const [bookings, setBookings] = useState<BookingProps[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<BookingProps[]>([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const locale = useLocale();

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/bookings/all?locale=${locale}`);
      if (!response.ok) {
        throw new Error(`Error fetching bookings: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
      setBookings(data.bookings);
    } catch (err) {
      setError("Error fetching bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [locale]);

  useEffect(() => {
    const statusFiltered =
      filter === "all"
        ? bookings
        : bookings.filter((booking) => booking.status === filter);

    const searchFiltered = statusFiltered.filter((booking) => {
      const fullName = booking.fullName || "";
      const phoneNumber = booking.phoneNumber || "";
      return (
        fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        phoneNumber.includes(searchQuery)
      );
    });

    setFilteredBookings(searchFiltered);
  }, [filter, searchQuery, bookings]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen container mx-auto lg:p-12 md:p-12">
      <h1 className="text-xl text-gray-800 font-semibold mb-2">Bookings</h1>
      <p className="mb-4">Manage all bookings here</p>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search bookings by name or phone number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/3"
        />
        <Select
          value={filter}
          onValueChange={(value: string) => setFilter(value)}
        >
          <SelectTrigger className="max-w-xs">{filter || "Filter"}</SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Confirmed">Confirmed</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Canceled">Canceled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booking Date</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Timing</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                {new Date(booking.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{booking.fullName}</TableCell>
                <TableCell>{booking.phoneNumber}</TableCell>
                <TableCell>{booking.address}</TableCell>
                <TableCell>
                  {new Date(booking.timing).toLocaleString()}
                </TableCell>
                <TableCell>{booking.title}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      booking.status === "Confirmed"
                        ? "confirmed"
                        : booking.status === "Pending"
                        ? "pending"
                        : booking.status === "Canceled"
                        ? "canceled"
                        : booking.status === "Completed"
                        ? "completed"
                        : "outline"
                    }
                  >
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-between cursor-pointer">
                    {booking.status === "Pending" && (
                      <>
                        <Image
                          src="/edit-icon.svg"
                          alt="Edit"
                          width={38}
                          height={38}
                          className="p-2 border border-gray-200 rounded-md"
                        />
                        <Image
                          src="/confirm-icon.svg"
                          alt="Confirm"
                          width={38}
                          height={38}
                          className="p-2 border border-gray-200 rounded-md"
                        />
                        <Image
                          src="/cancel-icon.svg"
                          alt="Cancel"
                          width={38}
                          height={38}
                          className="p-2 border border-gray-200 rounded-md"
                        />
                      </>
                    )}
                    {(booking.status === "Completed" ||
                      booking.status === "Canceled") && (
                      <Image
                        src="/edit-icon.svg"
                        alt="Edit"
                        width={38}
                        height={38}
                        className="p-2 border border-gray-200 rounded-md"
                      />
                    )}
                    {booking.status === "Confirmed" && (
                      <>
                        <Image
                          src="/edit-icon.svg"
                          alt="Edit"
                          width={38}
                          height={38}
                          className="p-2 border border-gray-200 rounded-md"
                        />
                        <Image
                          src="/cancel-icon.svg"
                          alt="Cancel"
                          width={38}
                          height={38}
                          className="p-2 border border-gray-200 rounded-md"
                        />
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                No bookings available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminView;
