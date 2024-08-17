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
    <div className="-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 bg-gray-50">
              <Image
                src={service.banner}
                alt={service.title}
                width={500}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
            <div className="md:w-1/2 p-8">
              <h2 className="text-xl lg:text-2xl md:text-2xl font-semibold mb-6 text-center text-gray-800">
                {t("title")}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-6 lg:space-y-0">
                  <div className="flex-1 relative">
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                      required
                      placeholder=""
                    />
                    <label
                      htmlFor="firstName"
                      className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      {t("fname")}
                    </label>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                      required
                      placeholder=""
                    />
                    <label
                      htmlFor="lastName"
                      className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      {t("lname")}
                    </label>
                  </div>
                </div>
                <div className="flex-1 relative">
                  <input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                    required
                    placeholder=""
                  />
                  <label
                    htmlFor="phoneNumber"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    {t("phone")}
                  </label>
                </div>
                <div className="flex-1 relative">
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                    required
                    placeholder=""
                  />
                  <label
                    htmlFor="address"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    {t("address")}
                  </label>
                </div>
                <div className="flex-1 relative">
                  <input
                    id="date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                    required
                    placeholder=""
                  />
                  <label
                    htmlFor="date"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    {t("date")}
                  </label>
                </div>
                <div className="flex-1 relative">
                  <input
                    id="time"
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                    required
                    placeholder=""
                  />
                  <label
                    htmlFor="time"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    {t("time")}
                  </label>
                </div>
                <div className="flex-1 relative">
                  <textarea
                    id="needs"
                    name="needs"
                    value={formData.needs}
                    onChange={handleChange}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                    rows={4}
                  ></textarea>
                  <label
                    htmlFor="needs"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    {t("needs")}
                    <span className="text-amber-400">({t("optional")})</span>
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-black text-white rounded-lg shadow-lg transition duration-300"
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
