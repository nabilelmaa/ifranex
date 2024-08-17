import React from "react";
import StepCard from "./StepCard";
import { useTranslations } from "next-intl";

interface Step {
  title: string;
  description: string;
  icon: string;
}

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
    <section
      id="how"
      className="py-16 px-4 bg-gradient-to-b from-tertiaryCol to-white"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="text-xl lg:text-3xl md:text-2xl text-center font-bold text-gray-900 mb-12">
          {t("how_it_works")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-24">
          {steps.slice(0, 3).map((step, index) => (
            <StepCard key={step.title} {...step} index={index} />
          ))}
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-24 md:w-2/3 mx-auto">
          {steps.slice(3).map((step, index) => (
            <StepCard key={step.title} {...step} index={index + 3} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
