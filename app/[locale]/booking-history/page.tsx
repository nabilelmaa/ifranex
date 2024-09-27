import type { Metadata } from "next";
import BookingHistory from "@/app/components/BookingHistoryClient";

export const metadata: Metadata = {
  title: "IfraneX | History",
  description: "View and manage your bookings effeciently.",
};

const Page: React.FC = () => {
  return <BookingHistory />;
};

export default Page;
