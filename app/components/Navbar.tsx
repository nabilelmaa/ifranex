"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import LocalSwitcher from "./locale-switcher";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthChecked, setAuthChecked] = useState(false);
  const Avatar = dynamic(() => import("./Avatar"), { ssr: false });

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setSidebarOpen(false);
  };

  useEffect(() => {
    setAuthChecked(true);
  }, [isAuthenticated]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  const isHomePage = pathname === `/${locale}`;
  const isDashboardPage = pathname === `/${locale}/admin/dashboard`;
  const isServicesPage = pathname === `/${locale}/admin/services`;
  const isReviewsPage = pathname === `/${locale}/admin/reviews`;
  const isUsersPage = pathname === `/${locale}/admin/users`;
  const isLoginPage = pathname === `/${locale}/login`;
  const isRegisterPage = pathname === `/${locale}/register`;
  const isResetPasswowrdPage = pathname === `/${locale}/reset-password`;

  return (
    <div>
      {!isLoginPage &&
        !isRegisterPage &&
        !isDashboardPage &&
        !isServicesPage &&
        !isReviewsPage &&
        !isUsersPage &&
        !isResetPasswowrdPage && (
          <>
            <nav className="flex items-center justify-between py-3 fixed top-0 left-0 right-0 lg:px-32 w-full z-50 bg-white bg-opacity-70 backdrop-blur-md backdrop-blur-ios backdrop-saturate-150">
              <div className="flex items-center">
                {(isHomePage || !isHomePage) && (
                  <div className="lg:hidden mr-4 rounded-md">
                    <Image
                      src="/menu.svg"
                      alt={isSidebarOpen ? "Close menu" : "Open menu"}
                      width={20}
                      height={20}
                      onClick={() => setSidebarOpen(!isSidebarOpen)}
                      className="cursor-pointer"
                    />
                  </div>
                )}

                <Link href={`/${locale}`}>
                  <div className="flex items-center gap-1">
                    <Image
                      src="/app-logo.svg"
                      alt="Home logo icon"
                      width={38}
                      height={38}
                      className="cursor-pointer mr-2 object-contain"
                      priority
                    />
                  </div>
                </Link>
              </div>
              {isHomePage && (
                <ul className="lg:flex justify-center gap-4 hidden h-full text-gray-900">
                  <li
                    className="text-gray-800 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer"
                    onClick={() => scrollToSection("about")}
                  >
                    {t("nav_about")}
                  </li>
                  <li
                    className="text-gray-800 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer"
                    onClick={() => scrollToSection("services")}
                  >
                    {t("nav_services")}
                  </li>
                  <li
                    className="text-gray-800 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer"
                    onClick={() => scrollToSection("how")}
                  >
                    {t("nav_how_it_works")}
                  </li>
                  <li
                    className="text-gray-800 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer"
                    onClick={() => scrollToSection("us")}
                  >
                    {t("nav_us")}
                  </li>
                  <li
                    className="text-gray-800 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer"
                    onClick={() => scrollToSection("reviews")}
                  >
                    {t("nav_reviews")}
                  </li>
                </ul>
              )}
              {!isHomePage && (
                <ul className="lg:flex justify-center gap-4 hidden h-full text-gray-900">
                  <li>
                    <Link href="/">
                      <p className="text-gray-800 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer">
                        {t("nav_home")}
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/messages`}>
                      <p className="text-gray-800 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer">
                        {t("inbox")}
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/services`}>
                      <p className="text-gray-800 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer">
                        {t("services")}
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/booking-history`}>
                      <p className="text-gray-800 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer">
                        {t("history")}
                      </p>
                    </Link>
                  </li>
                </ul>
              )}
              <div className="relative text-left flex items-center">
                <LocalSwitcher />
                {isAuthChecked && (
                  <>
                    {isAuthenticated ? (
                      <Avatar />
                    ) : (
                      <Link href={`/${locale}/login`}>
                        <button className="hidden lg:block ml-8 px-4 py-3 w-32 text-sm font-semibold leading-none bg-white rounded-full shadow-md transition duration-100">
                          {t("login_button")}
                        </button>
                      </Link>
                    )}
                  </>
                )}
              </div>
            </nav>

            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setSidebarOpen(false)}
              ></div>
            )}
            <div
              className={`fixed top-0 left-0 bottom-0 w-80 bg-white/80 shadow-lg transform transition-all duration-300 ease-in-out ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } z-50 overflow-y-auto backdrop-blur-md`}
            >
              <div className="flex flex-col h-full">
                <div className="p-6">
                  <Link
                    href={`/${locale}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Image
                      src="/ifranex-2.png"
                      alt="Ifranex logo"
                      width={60}
                      height={40}
                      sizes="(max-width: 768px) 80px, 120px"
                      className="cursor-pointer object-contain w-auto h-[32px] md:h-[40px]"
                      priority
                    />
                  </Link>
                </div>
                <ul className="flex-grow flex flex-col items-start px-6 py-2 gap-2 font-semibold">
                  {isHomePage ? (
                    <ul className="space-y-2">
                      {[
                        {
                          id: "about",
                          icon: "/about.svg",
                          label: t("nav_about"),
                        },
                        {
                          id: "services",
                          icon: "/work.svg",
                          label: t("nav_services"),
                        },
                        {
                          id: "how",
                          icon: "/how.svg",
                          label: t("nav_how_it_works"),
                        },
                        { id: "us", icon: "/question.svg", label: t("nav_us") },
                        {
                          id: "reviews",
                          icon: "/message.svg",
                          label: t("nav_reviews"),
                        },
                      ].map(({ id, icon, label }) => (
                        <li key={id} onClick={() => scrollToSection(id)}>
                          <a className="flex items-center p-3 rounded-lg transition-all duration-200 bg-gra-50 hover:bg-gray-100 hover:shadow-md group">
                            <Image
                              src={icon}
                              alt={label}
                              width={20}
                              height={20}
                            />
                            <span className="ml-3 font-medium text-gray-700">
                              {label}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <>
                      <li>
                        <Link
                          href={`/${locale}`}
                          className={`block px-4 py-2 rounded-md w-52 ${
                            pathname === `/${locale}`
                              ? "bg-gray-50"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <div className="flex items-center">
                            <Image
                              src="/home.svg"
                              alt="home"
                              width={20}
                              height={20}
                            />
                            <p className="ml-2">{t("nav_home")}</p>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/${locale}/messages`}
                          className={`block px-4 py-2 rounded-md w-52 ${
                            pathname === `/${locale}/messages`
                              ? "bg-gray-50"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <div className="flex items-center">
                            <Image
                              src="/inbox.svg"
                              alt="inbox"
                              width={20}
                              height={20}
                            />
                            <p className="ml-2">{t("inbox")}</p>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/${locale}/services`}
                          className={`block px-4 py-2 rounded-md w-52 ${
                            pathname === `/${locale}/services`
                              ? "bg-gray-50"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <div className="flex items-center">
                            <Image
                              src="/services.svg"
                              alt="services"
                              width={20}
                              height={20}
                            />
                            <p className="ml-2">{t("services")}</p>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/${locale}/booking-history`}
                          className={`block px-4 py-2 rounded-md w-52 ${
                            pathname === `/${locale}/booking-history`
                              ? "bg-gray-50"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <div className="flex items-center">
                            <Image
                              src="/history.svg"
                              alt="history"
                              width={20}
                              height={20}
                            />
                            <p className="ml-2">{t("history")}</p>
                          </div>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
                <div className="p-6">
                  {!isAuthenticated && (
                    <Link href={`/${locale}/login`}>
                      <button
                        className="w-full mt-4 px-4 py-3 text-sm font-semibold leading-none bg-white border border-black rounded-full shadow-md transition duration-100"
                        onClick={() => setSidebarOpen(false)}
                      >
                        {t("login_button")}
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
    </div>
  );
};
