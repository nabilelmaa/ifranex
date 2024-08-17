"use client";

import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaLinkedinIn,
} from "react-icons/fa";

export const Footer = () => {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const pathname = usePathname();

  const isExcludedPage = [
    `/${locale}/admin/dashboard`,
    `/${locale}/admin/services`,
    `/${locale}/admin/reviews`,
    `/${locale}/admin/users`,
    `/${locale}/login`,
    `/${locale}/register`,
    `/${locale}/reset-password`,
  ].includes(pathname);

  if (isExcludedPage) return null;

  return (
    <section id="about">
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <Image
                src="/ifranex-3.png"
                alt="logo"
                width={100}
                height={100}
                className="mb-4"
              />
              <p className="text-gray-400 mt-2">{t("company_description")}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t("company")}</h3>
              <ul className="space-y-2">
                {[
                  "about_us",
                  "customer_reviews",
                  "pricing",
                  "company_policies",
                  "terms_and_services",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition duration-300"
                    >
                      {t(item)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t("services")}</h3>
              <ul className="space-y-2">
                {[
                  "tap_repair_and_replacement",
                  "toilet_and_shower_leaks",
                  "kitchen_installations",
                  "bathroom_installations",
                  "emergency_plumber",
                  "baby_sitting",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition duration-300"
                    >
                      {t(item)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                {t("get_in_touch")}
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>+212 6 11223344</li>
                <li>support@ifranex.online</li>
                <li>{t("ifrane_morocco")}</li>
              </ul>
              <div className="mt-4 flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-500 transition duration-300"
                >
                  <FaFacebook />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition duration-300"
                >
                  <FaWhatsapp />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-rose-600 transition duration-300"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition duration-300"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>
          <div className="py-8 text-center text-gray-400">
            <p>
              {t("dev_by_1")}{" "}
              <a
                href="mailto:nabilelmaa@gmail.com"
                className="font-medium text-white hover:underline"
              >
                nabilelmaa@gmail.com
              </a>
              , {t("dev_by_2")}
              <br />
              <a
                href="https://nabilel-portfolio.vercel.app"
                className="text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("dev_by_3")}
              </a>{" "}
              {t("dev_by_4")}{" "}
              <a
                href="https://www.linkedin.com/in/nabil-el-maaroufi-0385ab232/"
                className="text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              .
            </p>
          </div>

          <div className="border-t border-gray-800 py-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()}. {t("rights_reserved")}
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
};
