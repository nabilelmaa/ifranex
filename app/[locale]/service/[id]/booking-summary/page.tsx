"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ServiceProps } from "@/types/index";
import { useToast } from "@/contexts/ToastContext";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { tailChase } from "ldrs";
import { Calendar, Clock, MapPin, Phone, User } from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  timing: string;
  needs: string;
}

const BookingSummary = () => {
  const router = useRouter();
  const [service, setService] = useState<ServiceProps | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const locale = useLocale();
  const t = useTranslations("BookingForm");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get("service");
    const formDataParam = urlParams.get("formData");

    if (serviceParam && formDataParam) {
      setService(JSON.parse(serviceParam));
      setFormData(JSON.parse(formDataParam));
    }
  }, []);

  const handleConfirmBooking = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch("/api/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          serviceTitle: service?.title,
          serviceId: service?.id,
          timing: new Date(formData?.timing || "").toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to confirm booking");
      }
      showToast("Booking created successfully!", "success");
      router.push(`/${locale}/booking-history`);
    } catch (error) {
      console.error(error);
      showToast("Failed to create booking. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBooking = () => {
    router.push(`/${locale}/services`);
  };

  if (!service || !formData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <l-tail-chase size="24" speed="1.75" color="4f46e5" />
      </div>
    );
  }
  tailChase.register();

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8 bg-white shadow-2xl rounded-lg min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 border-b-2 border-indigo-500 pb-4">
        {t("confirm_title")}
      </h2>

      <div className="bg-gray-50 rounded-lg shadow-md p-6 space-y-6">
        <h3 className="text-2xl font-semibold text-gray-700 border-l-4 border-indigo-500 pl-3">
          {t("service_details")}
        </h3>
        <div className="flex flex-col lg:flex-row lg:space-x-6">
          <div className="flex-1 mb-4 lg:mb-0">
            <Image
              src={service.banner}
              alt={service.title}
              width={500}
              height={300}
              className="rounded-lg shadow-md object-cover w-full h-64"
            />
          </div>
          <div className="flex-1 space-y-4">
            <p className="text-xl font-semibold text-indigo-600">
              {service.title}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg shadow-md p-6 space-y-6">
        <h3 className="text-2xl font-semibold text-gray-700 border-l-4 border-indigo-500 pl-3">
          {t("your_details")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: User, label: t("fname"), value: formData.firstName },
            { icon: User, label: t("lname"), value: formData.lastName },
            { icon: Phone, label: t("phone"), value: formData.phoneNumber },
            { icon: MapPin, label: t("address"), value: formData.address },
            {
              icon: Calendar,
              label: t("date"),
              value: new Date(formData.timing).toLocaleDateString(),
            },
            {
              icon: Clock,
              label: t("time"),
              value: new Date(formData.timing).toLocaleTimeString(),
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-md shadow-sm border border-gray-200"
            >
              <div className="flex items-center space-x-3 mb-2">
                <item.icon className="text-indigo-500" size={20} />
                <p className="font-medium text-gray-700">{item.label}</p>
              </div>
              <p className="text-gray-600 ml-8">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 mt-4">
          <p className="font-medium text-gray-700 mb-2">{t("needs")}</p>
          <p className="text-gray-600">{formData.needs}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <button
          onClick={handleConfirmBooking}
          className="flex-1 py-3 px-6 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <l-tail-chase size="20" speed="1.75" color="white" />
          ) : (
            t("confirm")
          )}
        </button>
        <button
          onClick={handleCancelBooking}
          className="flex-1 py-3 px-6 text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-md shadow-lg hover:bg-indigo-50 transition-colors duration-300"
          disabled={isLoading}
        >
          {t("cancel")}
        </button>
      </div>
    </div>
  );
};

export default BookingSummary;
