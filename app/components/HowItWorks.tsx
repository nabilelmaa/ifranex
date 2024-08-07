import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

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
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 relative">
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-indigo-700 rounded-full flex items-center justify-center text-white text-xl font-bold">
        {index + 1}
      </div>
      <div className="mb-4 flex justify-center">
        <Image src={icon} alt={title} width={80} height={80} />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-sm text-center">{description}</p>
    </div>
  );
};

export const HowItWorks: React.FC = () => {
  const t = useTranslations("How");
  const steps: Step[] = [
    {
      title: t("title1"),
      description: t("step1"),
      icon: "/sign-in.svg",
    },
    {
      title: t("title2"),
      description: t("step2"),
      icon: "/choose.svg",
    },
    {
      title: t("title3"),
      description: t("step3"),
      icon: "/fill-form.svg",
    },
    {
      title: t("title4"),
      description: t("step4"),
      icon: "/confirm-process.svg",
    },
    {
      title: t("title5"),
      description: t("step5"),
      icon: "/pay.svg",
    },
  ];
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl lg:text-3xl md:text-2xl text-center font-bold text-gray-900 mb-12">
          {t("how_it_works")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <StepCard key={step.title} {...step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
