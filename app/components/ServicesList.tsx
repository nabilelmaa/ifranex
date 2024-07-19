import { ServicesCard } from "@/app/components/ServicesCard";
import { useLocale } from "next-intl";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

export const ServicesList = () => {
  const locale = useLocale();
  return (
    <div className="bg-sky-50 p-6 lg:p-12 rounded-sm">
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
          <button className="p-2 border text-white bg-green-400 hover:bg-green-500 font-semibold rounded-md">
            <div className="flex items-center justify-center">
              <p className="mb-1">See all services</p>
              <p>
                <FaChevronRight />
              </p>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};
