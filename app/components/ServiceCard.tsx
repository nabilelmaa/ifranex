import Image from "next/image";
import { ServiceProps } from "@/types/index";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

interface ServiceCardProps {
  service: ServiceProps;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const t = useTranslations("ServiceCard");
  const locale = useLocale();
  return (
    <div className="flex flex-col h-full border rounded-md shadow-lgcursor-pointer duration-50 hover:shadow-xl transition-transform duration-300 hover:scale-105 bg-white">
      <div className="relative w-full h-40 mb-4 overflow-hidden">
        <Image
          src={service.banner}
          alt={service.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="flex-grow px-2">
        <h1 className="font-semibold text-sm lg:text-md md:text-xl">
          {service.title}
        </h1>
        <p className="text-xs text-gray-700 lg:text-sm md:text-sm mt-2">
          {service.description}
        </p>
      </div>
      <div className="px-2 mt-2 mb-2">
        <h2 className="text-xl font-bold">
          <span className="text-[12px] font-light">MAD </span>
          {service.pricePerHour}
          <span className="text-[12px] font-light">/{t("hour")}</span>
        </h2>
      </div>
      <div className="mt-auto px-2 mb-2">
        <Link href={`/${locale}/service/${service.id}`}>
          <button className="p-2 border border-black rounded-full w-full">
            {t("book_now")}
          </button>
        </Link>
      </div>
    </div>
  );
};
