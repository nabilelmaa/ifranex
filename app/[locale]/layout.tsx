// pages/_app.tsx or pages/_document.tsx
import type { Metadata } from "next";
import "../globals.css";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";
import Head from "next/head";

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
      <Head>
        <meta
          name="google-site-verification"
          content="_Y7ML4gZWIySGLRKsVPsMiCRuaK58uL1TL4sqwszDmg"
        />
        <meta
          name="description"
          content="IfraneX offers top-notch home repair and handywork services. Discover our range of services and get your home in shape with our expert team."
        />
        <meta
          name="keywords"
          content="home repair, handywork, home maintenance, expert repair services, ifranex, IfraneX"
        />
        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="https://ifranex.vercel.app" />
      </Head>
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
