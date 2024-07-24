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

  const isHomePage = pathname === `/${locale}`;
  const isAdminPage = pathname === `/${locale}/admin`;
  const isLoginPage = pathname === `/${locale}/login`;
  const isRegisterPage = pathname === `/${locale}/register`;

  return (
    <>
      {!isLoginPage && !isRegisterPage && !isAdminPage && (
        <>
          <nav className="flex items-center justify-between p-6 z-50 relative">
            <Link href="/">
              <p className="font-bold text-green-500 text-xl lg:text-3xl md:text-3xl">
                Ifrane<span className="text-black">X.</span>
              </p>
            </Link>
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
            {/* {isHomePage && (
              <div className="lg:hidden md:hidden">
                <Image
                  src={isSidebarOpen ? "/x.svg" : "/menu.svg"}
                  alt={isSidebarOpen ? "Close menu" : "Open menu"}
                  width={24}
                  height={24}
                  onClick={() => setSidebarOpen(!isSidebarOpen)}
                  className="cursor-pointer"
                />
              </div>
            )} */}
          </nav>
          <div
            className={`fixed top-0 right-0 h-full bg-white w-full shadow-lg transform transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            } z-40`}
          >
            <ul className="flex flex-col items-start px-8 gap-4 mt-20">
              <li className="hover:text-green-400 transition cursor-pointer flex items-center gap-2">
                <Image src={"/home.svg"} alt="Home" width={20} height={20} />
                <Link href="/" className="block">
                  {t("nav_home")}
                </Link>
              </li>
              <li
                className="hover:text-green-400 transition cursor-pointer flex items-center gap-2"
                onClick={() => scrollToSection("footer")}
              >
                <Image src={"/about.svg"} alt="About" width={20} height={20} />
                {t("nav_about")}
              </li>
              <li
                className="hover:text-green-400 transition cursor-pointer flex items-center gap-2"
                onClick={() => scrollToSection("services")}
              >
                <Image
                  src={"/work.svg"}
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
                <Image src={"/question.svg"} alt="Us" width={20} height={20} />
                {t("nav_us")}
              </li>
              <li
                className="hover:text-green-400 transition cursor-pointer flex items-center gap-2"
                onClick={() => scrollToSection("reviews")}
              >
                <Image
                  src={"/message.svg"}
                  alt="Reviews"
                  width={20}
                  height={20}
                />
                {t("nav_reviews")}
              </li>
              <hr className="flex-grow border-gray-300" />
              <div>
                <Link href={`/${locale}/login`}>
                  <button
                    className="flex items-center font-semibold text-black transition-all gap-2"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Image
                      src={"/log-in.svg"}
                      alt="Login"
                      width={20}
                      height={20}
                    />
                    {t("login_button")}
                  </button>
                </Link>
              </div>
            </ul>
          </div>
        </>
      )}
    </>
  );
};
