import type { Metadata } from "next";
import MessagesClient from "@/app/components/MessagesClient";

export const metadata: Metadata = {
  title: "IfraneX | Inbox",
  description:
    "Find all your notifications here.",
};

const Page: React.FC = () => {
  return <MessagesClient />;
};

export default Page;
