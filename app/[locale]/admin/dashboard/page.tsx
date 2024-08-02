"use client";
import { useState, useEffect } from "react";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import Image from "next/image";
import { useToast } from "@/contexts/ToastContext";
import { useLocale } from "next-intl";
import { lineWobble } from "ldrs";
import { BarChart } from "@/app/components/BarChart";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

const Dashboard = () => {
  const [bookings, setBookings] = useState<BookingProps[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<BookingProps[]>([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const locale = useLocale();
  const { showToast } = useToast();

  const totalBookings = filteredBookings.length;
  const pendingBookings = filteredBookings.filter(
    (booking) => booking.status === "Pending"
  ).length;
  const confirmedBookings = filteredBookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;
  const completedBookings = filteredBookings.filter(
    (booking) => booking.status === "Completed"
  ).length;

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/bookings/all?locale=${locale}`);
      if (!response.ok) {
        throw new Error(`Error fetching bookings: ${response.statusText}`);
      }
      const data = await response.json();
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

  const handleConfirm = async (id: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}/confirm`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Confirmed" }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      showToast("Booking confirmed!", "success");
      await fetchBookings();
    } catch (error) {
      console.error("Error confirming booking:", error);
    }
  };

  const handleCancel = async (id: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}/cancel`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Canceled" }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      showToast("Booking canceled!", "success");
      await fetchBookings();
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  const handleCompleted = async (id: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}/complete`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Completed" }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      showToast("Congratulations, the job is completed! 🎉", "success");
      await fetchBookings();
    } catch (error) {
      console.error("Error confirming the job is completed:", error);
    }
  };

  lineWobble.register();

  if (loading) {
    return (
      <div className="min-h-screen container mx-auto flex items-center justify-center">
        <l-line-wobble
          size="80"
          stroke="5"
          bg-opacity="0.1"
          speed="1.75"
          color="black"
        ></l-line-wobble>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const chartData = [
    { label: "Total", value: totalBookings },
    { label: "Pending", value: pendingBookings },
    { label: "Confirmed", value: confirmedBookings },
    { label: "Completed", value: completedBookings },
  ];

  return (
    <div className="min-h-screen container mx-auto ">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-bl from-indigo-600 via-purple-700 to-pink-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-white">Total Bookings</CardTitle>
            <CardDescription className="text-4xl font-bold text-white">
              {totalBookings}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Image
                src="/trend-up.png"
                alt="Trend Up"
                width={24}
                height={24}
              />
              <span className="text-white">+5.2% this month</span>
            </div>
          </CardFooter>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-500 via-orange-600 to-red-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white">Pending Bookings</CardTitle>
            <CardDescription className="text-4xl font-bold text-white">
              {pendingBookings}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Image
                src="/trend-down.png"
                alt="Trend Down"
                width={24}
                height={24}
              />
              <span className="text-white">-1.8% this month</span>
            </div>
          </CardFooter>
        </Card>
        <Card className="bg-gradient-to-tr from-cyan-600 via-blue-700 to-indigo-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-white">Confirmed Bookings</CardTitle>
            <CardDescription className="text-4xl font-bold text-white">
              {confirmedBookings}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Image
                src="/trend-up.png"
                alt="Trend Up"
                width={24}
                height={24}
              />
              <span className="text-white">+2.5% this month</span>
            </div>
          </CardFooter>
        </Card>
        <Card className="bg-gradient-to-br from-teal-500 via-green-600 to-lime-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white">Completed Bookings</CardTitle>
            <CardDescription className="text-4xl font-bold text-white">
              {completedBookings}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Image
                src="/trend-up.png"
                alt="Trend Up"
                width={24}
                height={24}
              />
              <span className="text-white">+3.0% this month</span>
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm mt-12 p-4">
        <h1 className="text-xl text-gray-800 font-semibold mb-2">
          Bookings Overview
        </h1>
        <BarChart data={chartData} />
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm mt-12 p-4">
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
            <SelectTrigger className="max-w-xs">
              {filter || "Filter"}
            </SelectTrigger>
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
              <TableHead>Needs</TableHead>
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
                  <TableCell>{booking.description}</TableCell>
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
                    <div className="flex items-center lg:justify-between md:justify-between gap-2 cursor-pointer">
                      {booking.status === "Pending" && (
                        <>
                          <Image
                            src="/confirmed-icon.svg"
                            alt="Confirm"
                            width={38}
                            height={38}
                            onClick={() => handleConfirm(booking.id)}
                            className="p-2 border border-gray-200 rounded-md"
                          />
                          <Image
                            src="/canceled-icon.svg"
                            alt="Cancel"
                            width={38}
                            height={38}
                            onClick={() => handleCancel(booking.id)}
                            className="p-2 border border-gray-200 rounded-md mr-2"
                          />
                        </>
                      )}

                      {booking.status === "Confirmed" && (
                        <>
                          <Image
                            src="/completed-icon.svg"
                            alt="Edit"
                            width={38}
                            height={38}
                            onClick={() => handleCompleted(booking.id)}
                            className="p-2 border border-gray-200 rounded-md"
                          />
                          <Image
                            src="/canceled-icon.svg"
                            alt="Cancel"
                            width={38}
                            height={38}
                            onClick={() => handleCancel(booking.id)}
                            className="p-2 border border-gray-200 rounded-md mr-2"
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
    </div>
  );
};

export default Dashboard;
