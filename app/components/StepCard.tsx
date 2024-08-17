import React from "react";
import Image from "next/image";
import { useInView } from "@/app/components/useInView";

interface Step {
  title: string;
  description: string;
  icon: string;
}

const StepCard: React.FC<Step & { index: number }> = ({
  title,
  description,
  icon,
  index,
}) => {
  const [ref, isInView] = useInView();

  return (
    <div
      ref={ref}
      className={`relative flex flex-col h-full border rounded-md shadow-sm cursor-pointer duration-500 bg-white p-4 transform transition-all ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-tertiaryCol rounded-full flex items-center justify-center text-primaryCol text-xl font-bold">
        {index + 1}
      </div>
      <div className="relative w-full h-40 mb-4 overflow-hidden">
        <Image src={icon} alt={title} layout="fill" objectFit="contain" />
      </div>
      <div className="flex-grow px-4 text-center">
        <h3 className="font-semibold text-md lg:text-lg md:text-lg">{title}</h3>
        <p className="text-sm text-gray-700 lg:text-md md:text-md mt-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StepCard;
