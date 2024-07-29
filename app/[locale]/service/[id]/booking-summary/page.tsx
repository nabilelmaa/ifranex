"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ServiceProps } from "@/types/index";
import { useToast } from "@/contexts/ToastContext";
import Image from "next/image";
import { useLocale } from "next-intl";
import { tailChase } from "ldrs";
import { Calendar, Clock, MapPin, Phone, User } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  timing: string;
  needs: string;
}

const BookingSummary: React.FC = () => {
  const router = useRouter();
  const [service, setService] = useState<ServiceProps | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const locale = useLocale();

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
    router.push("/");
  };

  if (!service || !formData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <l-tail-chase size="40" speed="1.75" color="#4f46e5"></l-tail-chase>
      </div>
    );
  }
  tailChase.register();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg shadow-xl min-h-screen">
      <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
        Confirm Your Booking
      </h2>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 transform hover:scale-105 transition-transform duration-300">
        <h3 className="text-2xl font-bold text-indigo-800">Service Details</h3>
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
            <p className="text-xl font-semibold text-indigo-700">
              {service.title}
            </p>
            <p className="text-gray-600">{service.description}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 transform hover:scale-105 transition-transform duration-300">
        <h3 className="text-2xl font-bold text-indigo-800">Your Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 p-4 shadow-md rounded-md bg-gray-50">
            <div className="flex items-center space-x-2">
              <User className="text-indigo-600" size={20} />
              <p className="font-semibold text-indigo-600">First Name</p>
            </div>
            <p className="text-gray-700">{formData.firstName}</p>
          </div>
          <div className="space-y-2 p-4 shadow-md rounded-md bg-gray-50">
            <div className="flex items-center space-x-2">
              <User className="text-indigo-600" size={20} />
              <p className="font-semibold text-indigo-600">Last Name</p>
            </div>
            <p className="text-gray-700">{formData.lastName}</p>
          </div>
          <div className="space-y-2 p-4 shadow-md rounded-md bg-gray-50">
            <div className="flex items-center space-x-2">
              <Phone className="text-indigo-600" size={20} />
              <p className="font-semibold text-indigo-600">Phone Number</p>
            </div>
            <p className="text-gray-700">{formData.phoneNumber}</p>
          </div>
          <div className="space-y-2 p-4 shadow-md rounded-md bg-gray-50">
            <div className="flex items-center space-x-2">
              <MapPin className="text-indigo-600" size={20} />
              <p className="font-semibold text-indigo-600">Address</p>
            </div>
            <p className="text-gray-700">{formData.address}</p>
          </div>
          <div className="space-y-2 p-4 shadow-md rounded-md bg-gray-50">
            <div className="flex items-center space-x-2">
              <Calendar className="text-indigo-600" size={20} />
              <p className="font-semibold text-indigo-600">Date</p>
            </div>
            <p className="text-gray-700">
              {new Date(formData.timing).toLocaleDateString()}
            </p>
          </div>
          <div className="space-y-2 p-4 shadow-md rounded-md bg-gray-50">
            <div className="flex items-center space-x-2">
              <Clock className="text-indigo-600" size={20} />
              <p className="font-semibold text-indigo-600">Time</p>
            </div>
            <p className="text-gray-700">
              {new Date(formData.timing).toLocaleTimeString()}
            </p>
          </div>
        </div>
        <div className="space-y-2 p-4 shadow-md rounded-md bg-gray-50">
          <p className="font-semibold text-indigo-600">Needs</p>
          <p className="text-gray-700">{formData.needs}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <button
          onClick={handleConfirmBooking}
          className="flex-1 py-3 px-6 bg-black text-white rounded-md shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <l-tail-chase size="24" speed="1.75" color="white"></l-tail-chase>
          ) : (
            "Confirm Booking"
          )}
        </button>
        <button
          onClick={handleCancelBooking}
          className="flex-1 py-3 px-6  text-white bg-red-500 hover:bg-red-600 rounded-md shadow-lg transform hover:scale-105 transition-all duration-300"
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BookingSummary;