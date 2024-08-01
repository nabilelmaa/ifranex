import { useTranslations } from "next-intl";
import Image from "next/image";

export const WhyUs = () => {
  const t = useTranslations("Us");
  return (
    <section id="us">
      <div className="flex items-center justify-center w-full py-12 px-6 md:p-24 rounded-md bg-black">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-12 w-full max-w-5xl">
          <h2 className="font-semibold text-lg md:text-2xl lg:text-3xl text-black">
            {t("title")}
          </h2>
          <p className="text-gray-800 mt-4 text-sm md:text-base lg:text-md">
            {t("description")}
          </p>
          <div className="flex flex-col md:flex-row gap-8 mt-8">
            <div className="flex flex-col items-center md:items-start">
              <div className="mb-4">
                {" "}
                <Image src="/verified.svg" alt="" width={45} height={45} />
              </div>
              <p className="font-semibold text-black text-md md:text-xl lg:text-xl text-center md:text-left">
                {t("qualified_people")}
              </p>
              <p className="text-gray-800 text-start md:text-left text-sm mt-2">
                {t("qualified_people_desc")}
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="mb-4">
                <Image src="/clock.svg" alt="" width={45} height={45} />
              </div>
              <p className="font-semibold text-black text-md md:text-xl lg:text-xl text-center md:text-left">
                {t("services_24_7")}
              </p>
              <p className="text-gray-800 text-start md:text-left text-sm mt-2">
                {t("services_24_7_desc")}
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="mb-4">
                {" "}
                <Image src="/money.svg" alt="" width={45} height={45} />
              </div>
              <p className="font-semibold text-black text-md md:text-xl lg:text-xl text-center md:text-left">
                {t("competitive_pricing")}
              </p>
              <p className="text-gray-800 text-start md:text-left text-sm mt-2">
                {t("competitive_pricing_desc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
