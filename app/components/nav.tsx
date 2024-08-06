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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = pathname === `/${locale}`;

  const navItems = [
    { label: t("nav_about"), section: "footer", icon: "/about.svg" },
    { label: t("nav_services"), section: "services", icon: "/work.svg" },
    { label: t("nav_us"), section: "us", icon: "/question.svg" },
    { label: t("nav_reviews"), section: "reviews", icon: "/message.svg" },
  ];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setSidebarOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? '' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex-shrink-0">
              <Image
                src="/logo-black.svg"
                alt="logo"
                width={96}
                height={96}
                className="h-8 w-auto md:h-10"
              />
            </Link>
          </div>
          
          {isHomePage && (
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.section)}
                    className="text-gray-800 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <LocalSwitcher />
              {isAuthenticated ? (
                <Avatar />
              ) : (
                <Link href={`/${locale}/login`}>
                  <button className="ml-8 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                    {t("login_button")}
                  </button>
                </Link>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu open/close */}
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.section)}
              className="text-gray-800 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-5">
            <LocalSwitcher />
            {isAuthenticated ? (
              <Avatar />
            ) : (
              <Link href={`/${locale}/login`} className="w-full">
                <button className="w-full mt-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  {t("login_button")}
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};