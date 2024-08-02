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

  return (
    <>
      {!isLoginPage &&
        !isRegisterPage &&
        !isDashboardPage &&
        !isServicesPage &&
        !isUsersPage && (
          <>
            <nav className="flex items-center justify-between p-6 z-50 relative">
              <div className="flex items-center">
                <div className="lg:hidden md:hidden mr-4">
                  <Image
                    src={isSidebarOpen ? "/x.svg" : "/menu.svg"}
                    alt={isSidebarOpen ? "Close menu" : "Open menu"}
                    width={24}
                    height={24}
                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                    className="cursor-pointer"
                  />
                </div>
                <Link href="/">
                  <p className="font-bold text-colGreen-000 text-xl lg:text-2xl md:text-2xl">
                    Ifrane<span className="text-black">X.</span>
                  </p>
                </Link>
              </div>
              {isHomePage && (
                <ul className="lg:flex md:flex justify-center gap-4 hidden h-full text-gray-900">
                  <Link href="/">
                    <li className="hover:text-green-400 transition cursor-pointer">
                      {t("nav_home")}
                    </li>
                  </Link>
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
              <div className="relative text-left lg:flex md:flex items-center">
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
              className={`fixed top-0 left-0 h-full bg-white w-3/4 shadow-lg transform transition-transform duration-300 ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } z-50 lg:hidden md:hidden overflow-y-auto`}
            >
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-gray-200">
                  <Link href="/" onClick={() => setSidebarOpen(false)}>
                    <p className="font-bold text-colGreen-000 text-xl">
                      Ifrane<span className="text-black">X.</span>
                    </p>
                  </Link>
                </div>
                <ul className="flex-grow flex flex-col items-start px-6 py-4 gap-4">
                  <li className="hover:text-green-400 transition cursor-pointer flex items-center gap-2">
                    <Image src="/home.svg" alt="Home" width={20} height={20} />
                    <Link
                      href="/"
                      className="block"
                      onClick={() => setSidebarOpen(false)}
                    >
                      {t("nav_home")}
                    </Link>
                  </li>
                  <li
                    className="hover:text-green-400 transition cursor-pointer flex items-center gap-2"
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
                    className="hover:text-green-400 transition cursor-pointer flex items-center gap-2"
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
                    className="hover:text-green-400 transition cursor-pointer flex items-center gap-2"
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
                    className="hover:text-green-400 transition cursor-pointer flex items-center gap-2"
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
                </ul>
                <div className="p-6 border-t border-gray-200">
                  <Link href={`/${locale}/login`}>
                    <button
                      className="w-full mt-4 px-4 py-3 text-sm font-semibold leading-none bg-white rounded-full shadow-md transition duration-100"
                      onClick={() => setSidebarOpen(false)}
                    >
                      {t("login_button")}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
    </>
  );
};
