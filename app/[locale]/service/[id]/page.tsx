"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BookingForm from "@/app/components/forms/BookingForm";
import { ServiceProps } from "@/types/index";
import { useLocale, useTranslations } from "next-intl";

const BookingSkeleton = () => (
  <div className="flex flex-col lg:flex-row lg:p-12 md:p-6">
    <div className="flex-1 p-4 animate-pulse">
      <h2 className="text-2xl font-semibold mb-4 bg-gray-200 h-8 rounded"></h2>
      <form className="space-y-4">
        <input
          type="text"
          className="w-full p-2 border rounded-md bg-gray-200 h-10"
        />
        <input
          type="tel"
          className="w-full p-2 border rounded-md bg-gray-200 h-10"
        />
        <input
          type="text"
          className="w-full p-2 border rounded-md bg-gray-200 h-10"
        />
        <input
          type="datetime-local"
          className="w-full p-2 border rounded-md bg-gray-200 h-10"
        />
        <textarea className="w-full p-2 border rounded-md bg-gray-200 h-24"></textarea>
        <button
          type="submit"
          className="w-full p-2 bg-gray-300 text-white rounded-md cursor-not-allowed"
        ></button>
      </form>
    </div>
    <div className="flex-1 p-4 mt-4 lg:mt-0 lg:ml-4 animate-pulse">
      <div className="rounded-md shadow-lg overflow-hidden">
        <div className="w-full h-40 bg-gray-200"></div>
        <div className="p-4 bg-gray-100">
          <h3 className="text-xl font-semibold bg-gray-200 h-6 rounded mb-2"></h3>
          <p className="text-gray-700 bg-gray-200 h-4 rounded"></p>
        </div>
      </div>
    </div>
  </div>
);

const Page = () => {
  const { id } = useParams();
  const [service, setService] = useState<ServiceProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const locale = useLocale();
  const t = useTranslations("Navbar");

  useEffect(() => {
    const fetchService = async () => {
      if (id) {
        const response = await fetch(`/api/services/${id}`);
        const data = await response.json();
        setService(data);
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);
  if (loading) return <BookingSkeleton />;
  if (!service) return <div>Loading...</div>;

  return (
    <div className="lg:p-12 md:p-6">
      <div className="breadcrumbs text-sm p-2 mb-4">
        <ul>
          <li>
            <a href={`/${locale}`}>{t("nav_home")}</a>
          </li>
          <li>
            <a href={`/${locale}/services`}>{t("nav_services")}</a>
          </li>
          <li>
            <a>{service.title}</a>
          </li>
        </ul>
      </div>
      <BookingForm service={service} />;
    </div>
  );
};

export default Page;
