"use client";
import { useState, useEffect } from "react";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import Image from "next/image";
import { useToast } from "@/contexts/ToastContext";
import { useLocale } from "next-intl";
import { lineWobble } from "ldrs";
import { BarChart } from "@/app/components/BarChart";
import { tailspin } from "ldrs";
import { useTranslations } from "next-intl";
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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

const Dashboard = () => {
  const t = useTranslations("Tables");
  const [bookings, setBookings] = useState<BookingProps[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<BookingProps[]>([]);
  const [filter, setFilter] = useState(t("all"));
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({});
  const locale = useLocale();
  const { showToast } = useToast();

  type LoadingState = "confirm" | "cancel" | "complete" | null;
  type LoadingStates = { [key: string]: LoadingState };

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
      filter === t("all")
        ? bookings
        : bookings.filter(
            (booking) => translateStatus(booking.status as Status) === filter
          );

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
    setLoadingStates((prev) => ({ ...prev, [id]: "confirm" }));
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
      showToast(t("booking_confirmed"), "success");
      await fetchBookings();
    } catch (error) {
      console.error("Error confirming booking:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: null }));
    }
  };

  const handleCancel = async (id: string) => {
    setLoadingStates((prev) => ({ ...prev, [id]: "cancel" }));
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

      showToast(t("booking_canceled"), "success");
      await fetchBookings();
    } catch (error) {
      console.error("Error canceling booking:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: null }));
    }
  };

  const handleCompleted = async (id: string) => {
    setLoadingStates((prev) => ({ ...prev, [id]: "complete" }));
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

      showToast(t("booking_completed"), "success");
      await fetchBookings();
    } catch (error) {
      console.error("Error confirming the job is completed:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: null }));
    }
  };

  lineWobble.register();
  tailspin.register();

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
    { label: t("all"), value: filteredBookings.length },
    {
      label: t("pending"),
      value: filteredBookings.filter((booking) => booking.status === "Pending")
        .length,
    },
    {
      label: t("confirmed"),
      value: filteredBookings.filter(
        (booking) => booking.status === "Confirmed"
      ).length,
    },
    {
      label: t("completed"),
      value: filteredBookings.filter(
        (booking) => booking.status === "Completed"
      ).length,
    },
    {
      label: t("canceled"),
      value: filteredBookings.filter((booking) => booking.status === "Canceled")
        .length,
    },
  ];

  return (
    <div className="min-h-screen container mx-auto">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-bl from-indigo-600 via-purple-700 to-pink-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-white">{t("total_bookings")}</CardTitle>
            <CardDescription className="text-4xl font-bold text-white">
              {filteredBookings.length}
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
            <CardTitle className="text-white">
              {t("pending_bookings")}
            </CardTitle>
            <CardDescription className="text-4xl font-bold text-white">
              {
                filteredBookings.filter(
                  (booking) => booking.status === "Pending"
                ).length
              }
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
            <CardTitle className="text-white">
              {t("confirmed_bookings")}
            </CardTitle>
            <CardDescription className="text-4xl font-bold text-white">
              {
                filteredBookings.filter(
                  (booking) => booking.status === "Confirmed"
                ).length
              }
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
            <CardTitle className="text-white">
              {t("completed_bookings")}
            </CardTitle>
            <CardDescription className="text-4xl font-bold text-white">
              {
                filteredBookings.filter(
                  (booking) => booking.status === "Completed"
                ).length
              }
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
          {t("overview")}
        </h1>
        <BarChart data={chartData} />
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm mt-12 p-4">
        <h1 className="text-xl text-gray-800 font-semibold mb-2">
          {t("bookings")}
        </h1>
        <p className="mb-4">{t("manage_bookings")}</p>
        <div className="flex justify-between items-center mb-4">
          <Input
            placeholder={t("search_bookings")}
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
              <SelectItem value={t("all")}>{t("all")}</SelectItem>
              <SelectItem value={t("pending")}> {t("pending")}</SelectItem>
              <SelectItem value={t("confirmed")}>{t("confirmed")}</SelectItem>
              <SelectItem value={t("completed")}>{t("completed")}</SelectItem>
              <SelectItem value={t("canceled")}>{t("canceled")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("booking_date")}</TableHead>
              <TableHead>{t("customer_name")}</TableHead>
              <TableHead>{t("phone")}</TableHead>
              <TableHead>{t("address")}</TableHead>
              <TableHead>{t("timing")}</TableHead>
              <TableHead>{t("service")}</TableHead>
              <TableHead>{t("needs")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead>{t("actions")}</TableHead>
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
                      {translateStatus(booking.status as Status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center lg:justify-between md:justify-between gap-2 cursor-pointer">
                      {booking.status === "Pending" && (
                        <>
                          <div className="flex justify-center items-center p-2 border border-gray-200 rounded-md w-10 h-10">
                            {loadingStates[booking.id] === "confirm" ? (
                              <l-tailspin
                                size="14"
                                stroke="1"
                                speed="0.6"
                                color="black"
                              ></l-tailspin>
                            ) : (
                              <Image
                                src="/confirmed-icon.svg"
                                alt="Confirm"
                                width={32}
                                height={32}
                                onClick={() => handleConfirm(booking.id)}
                              />
                            )}
                          </div>
                          <div className="flex justify-center items-center p-2 border border-gray-200 rounded-md w-10 h-10">
                            {loadingStates[booking.id] === "cancel" ? (
                              <l-tailspin
                                size="14"
                                stroke="1"
                                speed="0.6"
                                color="black"
                              ></l-tailspin>
                            ) : (
                              <Image
                                src="/canceled-icon.svg"
                                alt="Cancel"
                                width={32}
                                height={32}
                                onClick={() => handleCancel(booking.id)}
                              />
                            )}
                          </div>
                        </>
                      )}

                      {booking.status === "Confirmed" && (
                        <>
                              <div className="flex justify-center items-center p-2 border border-gray-200 rounded-md w-10 h-10">
                            {loadingStates[booking.id] === "complete" ? (
                              <l-tailspin
                                size="14"
                                stroke="1"
                                speed="0.6"
                                color="black"
                              ></l-tailspin>
                            ) : (
                              <Image
                                src="/completed-icon.svg"
                                alt="Edit"
                                width={32}
                                height={32}
                                onClick={() => handleCompleted(booking.id)}
                              />
                            )}
                          </div>
                          <div className="flex justify-center items-center p-2 border border-gray-200 rounded-md w-10 h-10">
                            {loadingStates[booking.id] === "cancel" ? (
                              <l-tailspin
                                size="14"
                                stroke="1"
                                speed="0.6"
                                color="black"
                              ></l-tailspin>
                            ) : (
                              <Image
                                src="/canceled-icon.svg"
                                alt="Cancel"
                                width={32}
                                height={32}
                                onClick={() => handleCancel(booking.id)}
                              />
                            )}
                          </div>
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
