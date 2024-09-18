import type { Metadata } from "next";
import "../globals.css";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "IfraneX - Home Repair and Handywork Services",
  description:
    "IfraneX offers top-notch home repair and handywork services. Discover our range of services and get your home in shape with our expert team.",
  openGraph: {
    title: "IfraneX - Home Repair and Handywork Services",
    description: "Top-notch home repair and handywork services in Ifrane.",
    url: "https://ifranex.vercel.app",
    siteName: "IfraneX",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://ifranex.vercel.app",
    languages: {
      "en": "https://ifranex.vercel.app/en",
      "fr": "https://ifranex.vercel.app/fr",
    },
  },
  robots: "index, follow",
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
        <meta
          name="google-site-verification"
          content="pZPXaEwtvOCy1x5QMS-PBuLFUoXgEJVExC9h0dLhugc"
        />
        <meta
          name="google-adsense-account"
          content="ca-pub-3131838246288728"
        />
        <meta
          name="keywords"
          content={
            locale === "en"
              ? "home repair, handywork, home maintenance, expert repair services, ifranex, IfraneX, ifrane, ifranx, Ifranx"
              : "réparation maison, bricolage, entretien maison, services de réparation experts, ifranex, IfraneX, ifrane, ifranx, Ifranx"
          }
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
        <Script id="schema-structured-data" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "IfraneX",
              "description": "IfraneX offers top-notch home repair and handywork services.",
              "url": "https://ifranex.vercel.app",
              "sameAs": [
                "https://www.facebook.com/IfraneX",
                "https://www.instagram.com/IfraneX"
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Main St",
                "addressLocality": "Ifrane",
                "addressRegion": "Fès-Meknès",
                "postalCode": "53000",
                "addressCountry": "MA"
              },
              "telephone": "+212-5XX-XXXXXX",
              "openingHours": "Mo-Fr 09:00-18:00",
              "priceRange": "$$"
            }
          `}
        </Script>
      </body>
    </html>
  );
}
