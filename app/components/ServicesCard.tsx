import React from "react";
import Image from "next/legacy/image";
import { ServiceProps } from "@/types";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { ArrowRight, Clock, DollarSign } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";

interface ServiceCardProps {
  service: ServiceProps;
}

export const ServicesCard: React.FC<ServiceCardProps> = ({ service }) => {
  const locale = useLocale();
  const t = useTranslations("ServiceCard");

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 1000 }}
    >
      <Card className="group relative overflow-hidden h-72 transition-all duration-300 hover:shadow-xl">
        <div className="absolute inset-0">
          <Image
            src={service.banner}
            alt={service.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent" />
        </div>
        <div className="relative h-full flex flex-col justify-between p-6 text-white">
          <div>
            <Badge
              variant="secondary"
              className="mb-3 bg-primary text-white font-semibold px-3 py-1 text-xs uppercase tracking-wider"
            >
              {service.category}
            </Badge>
            <h2 className="text-2xl font-bold mb-3 line-clamp-2 leading-tight">
              {service.title}
            </h2>
            <p className="text-sm line-clamp-3 text-white/80 mb-4">
              {service.description}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4 text-sm">
              {/* <div className="flex items-center">
                <Clock size={16} className="mr-2 text-primary" />
                <span>{service.duration}</span>
              </div> */}
              <div className="flex items-center">
                <DollarSign size={16} className="mr-2 text-primary" />
                {/* <span>{service.price}</span> */}
              </div>
            </div>
            <Link href={`/${locale}/service/${service.id}`}>
              <Button
                variant="secondary"
                size="lg"
                className="w-full justify-center text-sm bg-primary text-white hover:bg-primary/90 transition-all duration-300"
              >
                {t("book_now")}
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};