import React from "react";
import Image from "next/image";
import { ServiceProps } from "@/types";

interface ServiceCardProps {
  service: ServiceProps;
}

export const ServicesCard: React.FC<ServiceCardProps> = ({ service }) => {

  return (
    <div className="flex flex-col h-full overflow-hidden border rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl bg-white">
      <div className="relative w-full h-48">
        <Image
          src={service.banner}
          alt={service.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="flex flex-col flex-grow p-4">
        <h1 className="font-meduim text-xl mb-2 text-gray-800">
          {service.title}
        </h1>
        <p className="text-sm text-gray-600 mb-4 flex-grow">
          {service.description}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
            {service.category}
          </span>
        </div>
      </div>
    </div>
  );
};
