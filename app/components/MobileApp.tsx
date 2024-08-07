import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
export const MobileApp = () => {
  const t = useTranslations("MobileApp");
  return (
    <section id="mobile-app" className="mt-12">
      <div className="flex lg:justify-between items-center">
        <div>
          <h2 className="text-xl lg:text-3xl md:text-2xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-xs lg:text-lg md:text-lg text-gray-600 mt-4 lg:w-[512px]">
            {t("description")}
          </p>
          <div className="gap-4 mt-4 flex justify-between">
            <button className="p-1 border bg-black rounded-md">
              <div className="flex items-center justify-center">
                <Image
                  src="/play-store.svg"
                  alt="play-store"
                  width={46}
                  height={46}
                />
                <p className="mr-2 font-semibold text-white text-xs lg:text-md md:text-md">
                  {t("download")} <span className="font-bold">Play Store</span>
                </p>
              </div>
            </button>
            <Link href="https://apps.apple.com/ma/app/facebook/id284882215">
              <button className="p-1 border border-black rounded-md">
                <div className="flex items-center justify-center">
                  <Image
                    src="/app-store.svg"
                    alt="app-store"
                    width={46}
                    height={46}
                  />
                  <p className="font-semibold text-xs lg:text-md md:text-md">
                    {t("download")} <span className="font-bold">App Store</span>
                  </p>
                </div>
              </button>
            </Link>
          </div>
        </div>

        <div className="lg:flex hidden">
          <Image
            src="/mockup.png"
            alt="image"
            width={960}
            height={960}
            quality={100}
          />
        </div>
      </div>
    </section>
  );
};
