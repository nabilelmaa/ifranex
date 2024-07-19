import { ServiceProps } from "@/types";
import Image from "next/image";

export const ServicesCard: React.FC<ServiceProps> = ({
  title,
  description,
  category,
  banner,
  id,
  pricePerHour,
}) => {
  return (
    <div className="border rounded-md shadow-lg bg-gray-100">
      <div className="relative w-full h-40 mb-4 overflow-hidden">
        <Image
          src={banner}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="px-2">
        <h1 className="font-semibold text-md lg:text-xl md:lg:text-xl">
          {title}
        </h1>
        <p className="text-xs lg:text-lg text-gray-700">{description}</p>
        <p className="text-green-500 mb-2">{category}</p>
      </div>
    </div>
  );
};
