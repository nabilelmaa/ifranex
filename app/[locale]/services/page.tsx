"use client";

import { Metadata } from "next";
import { SetStateAction, useEffect, useState } from "react";
import { ServiceProps } from "@/types/index";
import { useLocale, useTranslations } from "next-intl";
import { ServiceCard } from "@/app/components/ServiceCard";
import Cookies from "js-cookie";
import { useToast } from "@/contexts/ToastContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

export const metadata: Metadata = {
  title: "Services - IfraneX Home Repair and Handywork",
  description:
    "Explore a wide range of home repair and handywork services offered by IfraneX. Find the right service for your home improvement needs and book with our expert team today.",
  keywords:
    "home repair services, handywork services, home maintenance, home improvement, ifranex services, expert repair services, book home repair",
  openGraph: {
    title: "Services - IfraneX Home Repair and Handywork",
    description:
      "Explore a wide range of home repair and handywork services offered by IfraneX. Find the right service for your home improvement needs and book with our expert team today.",
    url: "https://ifranex.vercel.app/services",
    type: "website",
    siteName: "IfraneX",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services - IfraneX Home Repair and Handywork",
    description:
      "Explore a wide range of home repair and handywork services offered by IfraneX. Find the right service for your home improvement needs and book with our expert team today.",
  },
  alternates: {
    canonical: "https://ifranex.vercel.app/services",
    languages: {
      en: "https://ifranex.vercel.app/en/services",
      fr: "https://ifranex.vercel.app/fr/services",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

const Skeleton = () => (
  <div className="flex flex-col h-full border rounded-md shadow-lg bg-gray-100 animate-pulse">
    <div className="relative w-full h-40 mb-4 bg-gray-200 rounded-t-lg"></div>
    <div className="flex-grow px-2">
      <h1 className="font-semibold text-md lg:text-xl md:text-xl bg-gray-200 h-6 rounded mb-2"></h1>
      <p className="text-xs lg:text-lg text-gray-700 bg-gray-200 h-4 rounded"></p>
    </div>
    <div className="px-2 mt-2 mb-2">
      <h2 className="text-xl font-bold bg-gray-200 h-6 rounded"></h2>
    </div>
    <div className="mt-auto px-2 mb-2">
      <button className="p-2 border bg-gray-300 rounded-md w-full cursor-not-allowed"></button>
    </div>
  </div>
);

const Page: React.FC = () => {
  const [services, setServices] = useState<ServiceProps[]>([]);
  const [filteredServices, setFilteredServices] = useState<ServiceProps[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const { showToast } = useToast();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`/api/services?locale=${locale}`);
        if (!response.ok) {
          throw new Error(`Error fetching services: ${response.statusText}`);
        }
        const data = await response.json();
        const visibleServices = data.filter(
          (service: ServiceProps) => !service.hidden
        );

        setServices(visibleServices);
        setCategories([
          "All",
          ...Array.from(
            new Set<string>(
              visibleServices.map((service: ServiceProps) => service.category)
            )
          ),
        ]);
        setFilteredServices(visibleServices);
      } catch (error) {
        showToast("error_fetching_services", "error");
        setError("Error fetching services");
      } finally {
        setLoading(false);
      }
    };
    const token = Cookies.get("token");

    if (token) {
      fetchServices();
    }
  }, [locale]);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredServices(services);
    } else {
      setFilteredServices(
        services.filter((service) => service.category === selectedCategory)
      );
    }
  }, [selectedCategory, services]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen lg:p-12 md:p-6 space-y-6 p-2 lg:mt-0 mt-20">
      <div className="hidden lg:block mt-10 mb-4 breadcrumbs text-sm">
        <ul>
          <li>
            <a href={`/${locale}`}>{t("nav_home")}</a>
          </li>
          <li>
            <a href={`/${locale}/services`}>{t("nav_services")}</a>
          </li>
        </ul>
      </div>
      <div className="max-w-full max-auto lg:w-80">
        <p className="flex items-center p-2 border rounded-full w-full bg-tertiaryCol text-indigo-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            className="text-indigo-700"
            fill="none"
          >
            <path
              d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M8 12.5L10.5 15L16 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="ml-2">{t("browse")}</span>
        </p>
      </div>
      <h1 className="text-lg lg:text-2xl md:text-xl mt-4">{t("browse")}</h1>

      <div className="mt-4">
        <Select
          onValueChange={(value: SetStateAction<string>) =>
            setSelectedCategory(value)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-5 md:grid-cols-3 lg:gap-8 md:gap-4 mt-12">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} />
            ))
          : filteredServices.map((service) => (
              <div key={service.id}>
                <ServiceCard service={service} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Page;
