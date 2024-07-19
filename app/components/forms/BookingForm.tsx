"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocale } from "next-intl";
import { ServiceProps } from "@/types/index";
import Image from "next/image";

const BookingPage: React.FC<{ service: ServiceProps }> = ({ service }) => {
  const router = useRouter();
  const locale = useLocale();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    timing: "",
    needs: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/${locale}/service/${service.id}/booking-summary?service=${encodeURIComponent(
        JSON.stringify(service)
      )}&formData=${encodeURIComponent(JSON.stringify(formData))}`
    );
  };

  return (
    <div className="flex flex-col lg:flex-row lg:p-12 md:p-6 p-4 space-y-6 lg:space-y-0 lg:space-x-6">
      <div className="flex-1 space-y-6">
        <h2 className="text-3xl font-bold mb-4">Book Your Service</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="datetime-local"
            name="timing"
            value={formData.timing}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <textarea
            name="needs"
            placeholder="Describe your needs"
            value={formData.needs}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={4}
            required
          ></textarea>
          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
          >
            Proceed to Summary
          </button>
        </form>
      </div>
      <div className="flex-1 space-y-6">
        <div className="rounded-md shadow-lg overflow-hidden">
          <Image
            src={service.banner}
            alt={service.title}
            width={500}
            height={300}
            className="w-full h-40 object-cover"
          />
          <div className="p-6 bg-gray-100">
            <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-700">{service.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;

