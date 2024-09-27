import type { Metadata } from "next";
import ServicesClient from "../../components/ServicesClient";

export const metadata: Metadata = {
  title: "IfraneX | Services",
  description:
    "Explore IfraneX's comprehensive range of professional services, including home repair, maintenance, and expert handywork. From plumbing and electrical work to carpentry and painting, our skilled team is ready to tackle all your home improvement needs with precision and care.",
};

const Page: React.FC = () => {
  return <ServicesClient />;
};

export default Page;
