import type { Metadata } from "next";
import "../globals.css";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
      <head>
        {/* Google Site Verification */}
        <meta
          name="google-site-verification"
          content="_Y7ML4gZWIySGLRKsVPsMiCRuaK58uL1TL4sqwszDmg"
        />

        {/* SEO Meta Tags */}
        <meta
          name="description"
          content={
            locale === "en"
              ? "IfraneX offers top-notch home repair and handywork services. Discover our range of services and get your home in shape with our expert team."
              : "IfraneX propose des services de réparation et de bricolage de premier ordre. Découvrez notre gamme de services et remettez votre maison en état avec notre équipe d'experts."
          }
        />
        <meta
          name="keywords"
          content={
            locale === "en"
              ? "home repair, handywork, home maintenance, expert repair services, ifranex, IfraneX, ifrane"
              : "réparation maison, bricolage, entretien maison, services de réparation experts, ifranex, IfraneX, ifrane"
          }
        />
        <meta name="robots" content="index, follow" />

        {/* Canonical URL */}
        <link rel="canonical" href={`https://ifranex.vercel.app/${locale}`} />

        {/* Hreflang for SEO */}
        <link
          rel="alternate"
          href="https://ifranex.vercel.app/en"
          hrefLang="en"
        />
        <link
          rel="alternate"
          href="https://ifranex.vercel.app/fr"
          hrefLang="fr"
        />

        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SpeedInsights />
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
