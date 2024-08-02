"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ServiceProps } from "@/types/index";
import Image from "next/image";

const BookingPage: React.FC<{ service: ServiceProps }> = ({ service }) => {
  const router = useRouter();
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    date: "",
    time: "",
    needs: "",
  });
  const t = useTranslations("BookingForm");
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const combinedDateTime = `${formData.date}T${formData.time}`;
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const submissionData = {
      ...formData,
      fullName,
      timing: combinedDateTime,
    };
    setLoading(false);
    router.push(
      `/${locale}/service/${
        service.id
      }/booking-summary?service=${encodeURIComponent(
        JSON.stringify(service)
      )}&formData=${encodeURIComponent(JSON.stringify(submissionData))}`
    );
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <Image
                src={service.banner}
                alt={service.title}
                width={500}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 bg-gray-50">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
            <div className="md:w-1/2 p-8">
              <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
                {t("title")}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-6 lg:space-y-0">
                  <div className="flex-1">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("fname")}
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 rounded-lg border focus:bg-white focus:ring-0"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("lname")}
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 rounded-lg border focus:bg-white focus:ring-0"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("phone")}
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-lg border focus:bg-white focus:ring-0"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("address")}
                  </label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-lg border focus:bg-white focus:ring-0"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("date")}
                  </label>
                  <input
                    id="date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-lg border focus:bg-white focus:ring-0"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("time")}
                  </label>
                  <input
                    id="time"
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-lg border focus:bg-white focus:ring-0"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="needs"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("needs")}
                    <span className="text-amber-400">({t("optional")})</span>
                  </label>
                  <textarea
                    id="needs"
                    name="needs"
                    value={formData.needs}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-lg border focus:bg-white focus:ring-0"
                    rows={4}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-black text-white font rounded-lg shadow-lg hover:from-green-600 hover:to-blue-600 transition duration-300"
                >
                  {loading ? (
                    <l-tail-chase
                      size="24"
                      speed="1.75"
                      color="white"
                    ></l-tail-chase>
                  ) : (
                    t("proceed")
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
