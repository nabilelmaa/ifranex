import React from "react";
import Image from "next/image";
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
    <Card className="group relative overflow-hidden h-48 transition-all duration-300 hover:shadow-lg">
      <div className="absolute inset-0">
        <Image
          src={service.banner}
          alt={service.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      <div className="relative h-full flex flex-col justify-between p-4 text-white">
        <div>
          <Badge variant="secondary" className="mb-2 bg-white/20 text-white">
            {service.category}
          </Badge>
          <h2 className="text-lg font-bold line-clamp-1 mb-1">
            {service.title}
          </h2>
          <p className="text-sm line-clamp-2 text-white/80">
            {service.description}
          </p>
        </div>

        <div className="mt-2 flex items-center lg:justify-between justify-center">
          <Link href={`/${locale}/service/${service.id}`}>
            <Button
              variant="secondary"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs bg-white text-black hover:bg-white/90"
            >
              {t("book_now")}
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};
