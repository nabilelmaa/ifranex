import { ServicesCard } from "@/app/components/ServicesCard";
import { useLocale } from "next-intl";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";
import { Button } from "@/app/components/ui/tailwindcss-button";

export const ServicesList = () => {
  const locale = useLocale();
  const button = {
    name: "Tailwindcss Connect",
    description: "Button featured on Tailwindcss Connect website",
    showDot: false,
    component: (
      <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
        </span>
        <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
          <span>{`Tailwind Connect`}</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M10.75 8.75L14.25 12L10.75 15.25"
            ></path>
          </svg>
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
      </button>
    ),
  };
  return (
    <div className="p-6 lg:p-12 rounded-sm">
      <h1 className="mb-4 text-lg font-semibold lg:text-xl">
        Explore our popular services
      </h1>
      <div className="grid grid-cols-2 gap-2 lg:flex lg:items-center lg:justify-between md:flex md:items-center md:justify-between">
        <ServicesCard
          title="Babysetting"
          description="This is the best cleaning service"
          category="Baby"
          banner="https://res.cloudinary.com/dcncaesb0/image/upload/v1718908155/hrh-ifrane/baby-sitting_xspilg.jpg"
          id=""
          pricePerHour={45}
        />
        <ServicesCard
          title="Paiting home"
          description="This is the best painting service"
          category="Paiting"
          banner="https://res.cloudinary.com/dcncaesb0/image/upload/v1719427444/StockCake-Painter_at_Work_1719427419_w6vozw.jpg"
          id=""
          pricePerHour={45}
        />
        <ServicesCard
          title="Cleaning home"
          description="This is the best cleaning service"
          category="Cleaning"
          banner="https://res.cloudinary.com/dcncaesb0/image/upload/v1719426084/hrh-ifrane/mbwomub7chiatjalo0ux.jpg"
          id=""
          pricePerHour={45}
        />
        <ServicesCard
          title="Shower Repairs"
          description="This is the best cleaning service"
          category="Repair"
          banner="https://res.cloudinary.com/dcncaesb0/image/upload/v1719427215/StockCake-Modern_Shower_Head_1719427177_if7lzc.jpg"
          id=""
          pricePerHour={45}
        />
        <ServicesCard
          title="Home instalations"
          description="This is the best cleaning service"
          category="Instalation"
          banner="https://res.cloudinary.com/dcncaesb0/image/upload/v1719426080/hrh-ifrane/yo2i7kiaghqai6peozdf.jpg"
          id=""
          pricePerHour={45}
        />
      </div>
      <div className="flex justify-center items-center mt-4 w-full">
        <Link href={`/${locale}/services`}>
          <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block">
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            </span>
            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
              <span>See all services</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M10.75 8.75L14.25 12L10.75 15.25"
                ></path>
              </svg>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
          </button>
          {/* <button className="w-full lg:w-40 md:w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
            <div className="flex items-center justify-center">
              <p className="mb-1 mr-4">See all services</p>
              <p>
                <FaChevronRight />
              </p>
            </div>
          </button> */}
        </Link>
      </div>
    </div>
  );
};
