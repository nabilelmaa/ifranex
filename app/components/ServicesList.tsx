"use client";

import { useState, useEffect, useRef } from "react";
import { ServicesCard } from "@/app/components/ServicesCard";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";
import { ServiceProps } from "@/types/index";
import { gsap } from "gsap";
import { motion } from "framer-motion";

const ServicesCardSkeleton = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden border rounded-lg shadow-lg bg-white animate-pulse">
      <div className="relative w-full h-32 sm:h-48 bg-gray-200"></div>
      <div className="flex flex-col flex-grow p-3 sm:p-4 space-y-2 sm:space-y-4">
        <div className="w-3/4 h-4 sm:h-6 bg-gray-200 rounded"></div>
        <div className="flex-grow space-y-1 sm:space-y-2">
          <div className="w-full h-3 sm:h-4 bg-gray-200 rounded"></div>
          <div className="w-5/6 h-3 sm:h-4 bg-gray-200 rounded"></div>
          <div className="w-2/3 h-3 sm:h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="w-1/3 h-4 sm:h-6 bg-gray-200 rounded mt-auto"></div>
      </div>
    </div>
  );
};

export const ServicesList: React.FC = () => {
  const [services, setServices] = useState<ServiceProps[]>([]);
  const [loading, setLoading] = useState(true);
  const locale = useLocale();
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const t = useTranslations("ServiceCard");

  const fetchServices = async () => {
    try {
      const response = await fetch(`/api/services?locale=${locale}`);
      if (!response.ok) {
        throw new Error(`Error fetching services: ${response.statusText}`);
      }
      const data = await response.json();
      setServices(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [locale]);

  useEffect(() => {
    if (services.length > 0 && carouselRef.current) {
      const carousel = carouselRef.current;
      const cards = cardRefs.current.filter(
        (card): card is HTMLDivElement => card !== null
      );

      const clonedCards = cards.map(
        (card) => card.cloneNode(true) as HTMLDivElement
      );
      clonedCards.forEach((card) => carousel.appendChild(card));

      const totalWidth = cards.reduce((acc, card) => acc + card.offsetWidth, 0);

      gsap.set(carousel, { x: 0 });

      const tl = gsap.timeline({ repeat: -1, paused: true });
      tl.to(carousel, {
        x: -totalWidth,
        duration: 20,
        ease: "none",
        onComplete: () => {
          gsap.set(carousel, { x: 0 });
        },
      });

      tl.play();

      carousel.addEventListener("mouseenter", () => tl.pause());
      carousel.addEventListener("mouseleave", () => tl.play());

      [...cards, ...clonedCards].forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { scale: 1.05, duration: 0.3 });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { scale: 1, duration: 0.3 });
        });
      });

      return () => {
        tl.kill();
        clonedCards.forEach((card) => card.remove());
      };
    }
  }, [services]);

  return (
    <section className="overflow-hidden lg:py-20 mt-12 bg-gradient-to-b from-white to-tertiaryCol">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-xl lg:text-3xl md:text-2xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-md md:text-xl lg:text-xl text-gray-600 max-w-3xl mx-auto">
            {t("description")}
          </p>
        </div>
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex gap-3 sm:gap-4 overflow-visible"
            style={{ width: "200%" }}
          >
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex-shrink-0 w-44 sm:w-64">
                    <ServicesCardSkeleton />
                  </div>
                ))
              : services.slice(0, 6).map((service, index) => (
                  <motion.div
                    key={index}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className="flex-shrink-0 w-44 sm:w-64 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <ServicesCard service={service} />
                  </motion.div>
                ))}
          </div>
        </div>
        <div className="flex justify-center items-center lg:mt-12 mb-8 mt-6">
          <Link href={`${locale}/services`}>
            <button className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 rounded-full bg-white text-black font-semibold text-sm sm:text-sm transition duration-300 focus:outline-none ring-1 ring-black focus:ring-opacity-50">
              <div className="flex items-center justify-center">
                <span className="mr-2">{t("see_all_services")}</span>
                <FaChevronRight className="text-xs" />
              </div>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
