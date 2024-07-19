import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
export const MobileApp = () => {
  return (
    <section id="mobile-app" className="mt-12">
      <div className="flex lg:justify-between items-center">
        <div>
          <h1 className="text-lg lg:text-2xl md:text-2xl font-semibold">
            Get our free app
          </h1>
          <p className="text-xs lg:text-sm md:text-sm text-gray-600 mt-4 lg:w-[500px]">
            Book and manage appointments effortlessly, communicate seamlessly
            with your handy person, explore detailed profiles and ratings.
          </p>
          <div className="gap-4 mt-4 flex justify-between">
            <button className="p-1 border bg-black rounded-md">
              <div className="flex items-center justify-center">
                <Image
                  src="/play-store.svg"
                  alt="play-store"
                  width={50}
                  height={50}
                />
                <p className="mr-2 font-semibold text-white">
                  Download on <span className="font-bold">Play Store</span>
                </p>
              </div>
            </button>
            <Link href="https://apps.apple.com/ma/app/facebook/id284882215">
              <button className="p-1 border border-black rounded-md">
                <div className="flex items-center justify-center">
                  <Image
                    src="/app-store.svg"
                    alt="app-store"
                    width={50}
                    height={50}
                  />
                  <p className="mr-2 font-semibold">
                    Download on <span className="font-bold">App Store</span>
                  </p>
                </div>
              </button>
            </Link>
          </div>
        </div>
        <div className="lg:flex hidden">
          <div className="mockup-phone">
            <div className="camera"></div>
            <div className="display">
              <div className="artboard artboard-demo phone-1">
                <Image src="/image.png" alt="image" width={400} height={120} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
