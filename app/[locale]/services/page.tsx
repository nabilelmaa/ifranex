"use client";

import { SetStateAction, useEffect, useState } from "react";
import { ServiceProps } from "@/types/index";
import { useLocale } from "next-intl";
import { ServiceCard } from "@/app/components/ServiceCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

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

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`/api/services?locale=${locale}`);
        if (!response.ok) {
          throw new Error(`Error fetching services: ${response.statusText}`);
        }
        const data = await response.json();
        setServices(data);
        setCategories([
          "All",
          ...Array.from(
            new Set<string>(
              data.map((service: ServiceProps) => service.category)
            )
          ),
        ]);
        setFilteredServices(data);
      } catch (error) {
        setError("Error fetching services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
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
    <div className="lg:p-12 md:p-6 p-2">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <a href={`/${locale}`}>Home</a>
          </li>
          <li>
            <a>Services</a>
          </li>
        </ul>
      </div>
      <h1 className="text-lg lg:text-2xl md:text-xl mt-4">
        Browse our popular services
      </h1>

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
