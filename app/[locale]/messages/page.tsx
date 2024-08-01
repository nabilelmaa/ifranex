"use client";
import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FaEnvelope, FaCalendarCheck } from "react-icons/fa";
import { hourglass } from "ldrs";

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
        setIsLoading(false);
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
    <div className="container mx-auto p-4 h-screen">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <a href={`/${locale}`}>{t("nav_home")}</a>
          </li>
          <li>
            <a href={`/${locale}/services`}>{t("nav_services")}</a>
          </li>
        </ul>
      </div>
      <h1 className="text-2xl font-semibold mt-4 mb-6 text-gray-800">
        Your Inbox
      </h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <l-hourglass
            size="40"
            bg-opacity="0.1"
            speed="1.75"
            color="black"
          ></l-hourglass>
        </div>
      ) : messages.length === 0 ? (
        <p className="text-lg text-gray-600">You have no messages.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((message) => (
            <li
              key={message.id}
              className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <div className="flex items-center border-b border-gray-200 p-4 bg-gray-50">
                <FaEnvelope className="text-blue-600 mr-3" />
                <p className="font-semibold text-lg text-gray-800">
                  {message.serviceTitle}
                </p>
              </div>
              <div className="p-4">
                <p className="text-gray-700 mb-2">{message.content}</p>
                <p className="text-sm text-gray-500">
                  <FaCalendarCheck className="inline mr-1" />
                  {new Date(message.createdAt).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserInbox;
