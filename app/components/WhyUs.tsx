import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

export const WhyUs = () => {
  const t = useTranslations("Us");

  const features = [
    {
      icon: "/qualification.svg",
      title: "qualified_people",
      description: "qualified_people_desc",
    },
    {
      icon: "/24.svg",
      title: "services_24_7",
      description: "services_24_7_desc",
    },
    {
      icon: "/payment.svg",
      title: "competitive_pricing",
      description: "competitive_pricing_desc",
    },
  ];

  return (
    <section id="us" className="bg-gradient-to-b from-white to-tertiaryCol py-16">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-xl lg:text-3xl md:text-2xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-sm md:text-lg lg:text-lg text-gray-600 max-w-3xl mx-auto">
            {t("description")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader className="flex flex-col items-center space-y-1">
                <div className="rounded-full bg-tertiaryCol p-3 mb-2">
                  <Image src={feature.icon} alt="" width={32} height={32} />
                </div>
                <CardTitle className="text-lg lg:text-2xl md:text-2xl font-semibold text-center">
                  {t(feature.title)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center text-md lg:text-lg md:text-lg">
                  {t(feature.description)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
