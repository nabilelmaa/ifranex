import React from "react";
import Image from "next/legacy/image";
import { ServiceProps } from "@/types";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

interface ServiceCardProps {
  service: ServiceProps;
}

export const ServicesCard: React.FC<ServiceCardProps> = ({ service }) => {
  const locale = useLocale();
  const t = useTranslations("ServiceCard");

  return (
    <Card className="group relative overflow-hidden h-64 transition-all duration-300 hover:shadow-lg">
      <div className="absolute inset-0">
        <Image
          src={service.banner}
          alt={service.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      </div>

      <div className="relative h-full flex flex-col justify-between p-4 lg:p-6 md-p-6 text-white">
        <div>
          <Badge
            variant="secondary"
            className="mb-3 bg-white/30 text-white font-semibold px-3 py-1"
          >
            {service.category}
          </Badge>
          <h2 className="text-xl font-bold mb-2 line-clamp-2">
            {service.title}
          </h2>
          <p className="text-sm line-clamp-3 text-white/90 mb-4">
            {service.description}
          </p>
        </div>

        <div className="mt-auto">
          <Link href={`/${locale}/service/${service.id}`}>
            <Button
              variant="secondary"
              size="sm"
              className="w-full justify-center text-sm bg-white text-black hover:bg-white/90 transition-all duration-300"
            >
              {t("book_now")}
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};
