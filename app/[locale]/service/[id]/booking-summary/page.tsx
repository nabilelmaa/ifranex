"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ServiceProps } from "@/types/index";
import { useToast } from "@/contexts/ToastContext";
import Image from "next/image";
import { useLocale } from "next-intl";

const BookingSummary: React.FC = () => {
  const router = useRouter();
  const [service, setService] = useState<ServiceProps | null>(null);
  const [formData, setFormData] = useState<any>(null);
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
          timing: new Date(formData.timing).toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to confirm booking");
      }
      
    
      showToast("Booking created successfully!", "success");
      router.push(`/${locale}/success`);
    } catch (error) {
      console.error(error);
      showToast("Failed to create booking. Please try again.", "error");
    }
  };

  const handleCancelBooking = () => {
    router.push("/");
  };

  if (!service || !formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold">Confirm Your Booking</h2>

      <div className="bg-white rounded-md shadow-md p-6 space-y-4">
        <h3 className="text-xl font-semibold">Service Details</h3>
        <div className="flex flex-col lg:flex-row lg:space-x-6">
          <div className="flex-1">
            <Image
              src={service.banner}
              alt={service.title}
              width={500}
              height={300}
              className="rounded-md"
            />
          </div>
          <div className="flex-1 space-y-2">
            <p>
              <strong>Service:</strong> {service.title}
            </p>
            <p>
              <strong>Description:</strong> {service.description}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-md shadow-md p-6 space-y-4">
        <h3 className="text-xl font-semibold">Your Details</h3>
        <div className="space-y-2">
          <p>
            <strong>Full Name:</strong> {formData.fullName}
          </p>
          <p>
            <strong>Phone Number:</strong> {formData.phoneNumber}
          </p>
          <p>
            <strong>Address:</strong> {formData.address}
          </p>
          <p>
            <strong>Timing:</strong>{" "}
            {new Date(formData.timing).toLocaleString()}
          </p>
          <p>
            <strong>Needs:</strong> {formData.needs}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <button
          onClick={handleConfirmBooking}
          className="w-full lg:w-auto p-3 border border-black rounded-md mb-2 lg:mb-0"
        >
          Confirm Booking
        </button>
        <button
          onClick={handleCancelBooking}
          className="w-full lg:w-auto p-3 border bg-red-500 text-white border-gray-300 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BookingSummary;
