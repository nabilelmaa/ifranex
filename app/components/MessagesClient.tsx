"use client";
import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { hourglass } from "ldrs";
import Image from "next/image";

interface Message {
  id: string;
  content: string;
  createdAt: string;
  bookingId: string;
  serviceTitle: string;
  userId: string;
}

const UserInbox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const locale = useLocale();
  const t = useTranslations("Navbar");

  useEffect(() => {
    fetchMessages();
  }, [locale]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/bookings/messages?locale=${locale}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  hourglass.register();

  return (
    <div className="mt-12 min-h-screen">
      <div className="container mx-auto p-4">
        <div className="hidden lg:block mb-4 breadcrumbs text-sm">
          <ul>
            <li>
              <a href={`/${locale}`}>{t("nav_home")}</a>
            </li>
            <li>
              <a href={`/${locale}/services`}>{t("nav_services")}</a>
            </li>
            <li>
              <a href={`/${locale}`}>{t("inbox")}</a>
            </li>
          </ul>
        </div>

        <h1 className="text-md lg:text-2xl md:text-xl font-semibold text-gray-800 mb-6">
          {t("your_inbox")}
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <l-hourglass
              size="40"
              bg-opacity="0.1"
              speed="1.75"
              color="black"
            ></l-hourglass>
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <p className="text-xl text-gray-600">{t("no_messages")}</p>
          </div>
        ) : (
          <ul className="space-y-6">
            {messages.map((message) => (
              <li
                key={message.id}
                className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Image
                        src="/mail-check.svg"
                        alt="Message"
                        width={22}
                        height={22}
                        className="text-blue-600"
                      />
                      <h2 className="text-md lg:text-xl md:text-xl font-semibold text-gray-800">
                        {message.serviceTitle}
                      </h2>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Image
                        src="/calendar.svg"
                        alt="Date"
                        width={16}
                        height={16}
                        className="mr-2"
                      />
                      <span>
                        {new Date(message.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs lg:text-base md:text-base text-gray-700 leading-relaxed">
                    {message.content}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserInbox;
