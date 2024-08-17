"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BookingForm from "@/app/components/forms/BookingForm";
import { ServiceProps } from "@/types/index";
import { useLocale, useTranslations } from "next-intl";
import { Skeleton } from "@/app/components/ui/skeleton";

const BookingSkeleton = () => (
  <div className="h-screen">
    <div className="container mx-auto px-4">
      <div className="mt-16 lg:p-12 md:p-6">
        <div className="hidden lg:block mt-10 mb-4 text-sm">
          <Skeleton className="h-6 w-1/4 mb-2" />
          <Skeleton className="h-6 w-1/3" />
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <Skeleton className="w-full h-64" />
              <div className="p-6 bg-gray-50">
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
            <div className="md:w-1/2 p-8">
              <Skeleton className="h-10 w-1/2 mb-6" />
              <form className="space-y-6">
                <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-6 lg:space-y-0">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 flex-1" />
                </div>
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="w-full py-3 h-12" />
              </form>
            </div>
          </div>
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
    let isMounted = true;

    const fetchService = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/services/${id}`);
          if (!response.ok) throw new Error("Failed to fetch service data.");
          const data = await response.json();
          if (isMounted) {
            setService(data);
            setLoading(false);
          }
        } catch (error) {
          console.error(error);
          if (isMounted) {
            setLoading(false);
            setService(null);
          }
        }
      }
    };
    fetchService();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return <BookingSkeleton />;
  if (!service)
    return <div>Error loading service. Please try again later.</div>;

  return (
    <div className="mt-16 lg:p-12 md:p-6">
      <div className="hidden lg:block mt-10 mb-4 breadcrumbs text-sm">
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
      <BookingForm service={service} />
    </div>
  );
};

export default Page;
