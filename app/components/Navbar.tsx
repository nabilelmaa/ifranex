"use client";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import LocalSwitcher from "./locale-switcher";
import Avatar from "./Avatar";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthChecked, setAuthChecked] = useState(false);

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
  const isUsersPage = pathname === `/${locale}/admin/users`;
  const isLoginPage = pathname === `/${locale}/login`;
  const isRegisterPage = pathname === `/${locale}/register`;
  const isResetPasswowrdPage = pathname === `/${locale}/reset-password`;

  return (
    <>
      {!isLoginPage &&
        !isRegisterPage &&
        !isDashboardPage &&
        !isServicesPage &&
        !isUsersPage &&
        !isResetPasswowrdPage && (
          <>
            <nav className="flex items-center justify-between lg:px-8 px-2 py-6 z-50 relative">
              <div className="flex items-center">
                {(isHomePage || !isHomePage) && (
                  <div className="lg:hidden mr-4 bg-gray-200 p-2 rounded-md">
                    <Image
                      src="/menu.svg"
                      alt={isSidebarOpen ? "Close menu" : "Open menu"}
                      width={18}
                      height={18}
                      onClick={() => setSidebarOpen(!isSidebarOpen)}
                      className="cursor-pointer"
                    />
                  </div>
                )}
                <Link href="/">
                  <p className="font-bold text-colGreen-000 text-xl lg:text-2xl">
                    Ifrane<span className="text-black">X.</span>
                  </p>
                </Link>
              </div>
              {isHomePage && (
                <ul className="lg:flex justify-center gap-4 hidden h-full text-gray-900">
                  <li
                    className="hover:text-green-400 transition cursor-pointer"
                    onClick={() => scrollToSection("footer")}
                  >
                    {t("nav_about")}
                  </li>
                  <li
                    className="hover:text-green-400 transition cursor-pointer"
                    onClick={() => scrollToSection("services")}
                  >
                    {t("nav_services")}
                  </li>
                  <li
                    className="hover:text-green-400 transition cursor-pointer"
                    onClick={() => scrollToSection("us")}
                  >
                    {t("nav_us")}
                  </li>
                  <li
                    className="hover:text-green-400 transition cursor-pointer"
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
                      <p className="transition cursor-pointer p-2 hover:bg-green-100 hover:text-green-700 rounded-md">
                        {t("nav_home")}
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/messages`}>
                      <p className="transition cursor-pointer p-2 hover:bg-green-100 hover:text-green-700 rounded-md">
                        {t("inbox")}
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/services`}>
                      <p className="transition cursor-pointer p-2 hover:bg-green-100 hover:text-green-700 rounded-md">
                        {t("services")}
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/booking-history`}>
                      <p className="transition cursor-pointer p-2 hover:bg-green-100 hover:text-green-700 rounded-md">
                        {t("history")}
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/settings">
                      <p className="transition cursor-pointer p-2 hover:bg-green-100 hover:text-green-700 rounded-md">
                        {t("support")}
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
                        <button className="hidden lg:block ml-8 px-4 py-3 text-sm font-semibold leading-none bg-white rounded-full shadow-md transition duration-100">
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
              className={`fixed top-0 left-0 h-full bg-slate-50 w-3/4 shadow-lg transform transition-transform duration-300 ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } z-50 lg:hidden overflow-y-auto`}
            >
              <div className="flex flex-col h-full">
                <div className="p-6">
                  <Link href="/" onClick={() => setSidebarOpen(false)}>
                    <p className="font-bold text-colGreen-000 text-2xl">
                      Ifrane<span className="text-black">X.</span>
                    </p>
                  </Link>
                </div>
                <ul className="flex-grow flex flex-col items-start px-6 py-2 gap-2 font-semibold">
                  {isHomePage ? (
                    <>
                      <li
                        className="hover:text-green-600 transition cursor-pointer flex items-center gap-2 hover:bg-green-100 p-2 w-full rounded-md"
                        onClick={() => scrollToSection("footer")}
                      >
                        <Image
                          src="/about.svg"
                          alt="About"
                          width={20}
                          height={20}
                        />
                        {t("nav_about")}
                      </li>
                      <li
                        className="hover:text-green-600 transition cursor-pointer flex items-center gap-2 hover:bg-green-100 p-2 w-full rounded-md"
                        onClick={() => scrollToSection("services")}
                      >
                        <Image
                          src="/work.svg"
                          alt="Services"
                          width={20}
                          height={20}
                        />
                        {t("nav_services")}
                      </li>
                      <li
                        className="hover:text-green-600 transition cursor-pointer flex items-center gap-2 hover:bg-green-100 p-2 w-full rounded-md"
                        onClick={() => scrollToSection("us")}
                      >
                        <Image
                          src="/question.svg"
                          alt="Us"
                          width={20}
                          height={20}
                        />
                        {t("nav_us")}
                      </li>
                      <li
                        className="hover:text-green-600 transition cursor-pointer flex items-center gap-2 hover:bg-green-100 p-2 w-full rounded-md"
                        onClick={() => scrollToSection("reviews")}
                      >
                        <Image
                          src="/message.svg"
                          alt="Reviews"
                          width={20}
                          height={20}
                        />
                        {t("nav_reviews")}
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          href="/"
                          className={`block px-4 py-2 rounded-md w-52 ${
                            pathname === `/${locale}`
                              ? "bg-green-100"
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
                              ? "bg-green-100"
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
                              ? "bg-green-100"
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
                              ? "bg-green-100"
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
                      <li>
                        <Link
                          href="/settings"
                          className={`block px-4 py-2 rounded-md w-52 ${
                            pathname === `/${locale}/settings`
                              ? "bg-green-100"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <div className="flex items-center">
                            <Image
                              src="/support.svg"
                              alt="support"
                              width={20}
                              height={20}
                            />
                            <p className="ml-2">{t("support")}</p>
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
    </>
  );
};
