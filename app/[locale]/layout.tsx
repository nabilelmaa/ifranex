import type { Metadata } from "next";
import "../globals.css";

import { Inter } from "next/font/google";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IfraneX - Home Repair and Handywork Services",
  description:
    "IfraneX offers top-notch home repair and handywork services. Discover our range of services and get your home in shape with our expert team.",
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <ToastProvider>
              <Navbar />
              <main>{children}</main>
              <div className="lg:px-12 md:px-12">
                <Footer />
              </div>
            </ToastProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
