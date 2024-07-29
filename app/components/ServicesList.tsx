"use client";

import React, { useState, useEffect, useRef } from "react";
import { ServicesCard } from "@/app/components/ServicesCard";
import { useLocale } from "next-intl";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";
import { ServiceProps } from "@/types/index";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServicesCardSkeleton = () => {
  return (
    <div className="mt-12 flex flex-col h-full overflow-hidden border rounded-lg shadow-lg bg-gray-200 animate-pulse">
      <div className="relative w-full h-48 bg-gray-300"></div>
      <div className="flex flex-col flex-grow p-4 space-y-4">
        <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
        <div className="flex-grow space-y-2">
          <div className="w-full h-4 bg-gray-300 rounded"></div>
          <div className="w-5/6 h-4 bg-gray-300 rounded"></div>
          <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="w-1/3 h-6 bg-gray-300 rounded mt-auto"></div>
      </div>
    </div>
  );
};

export const ServicesList: React.FC = () => {
  const [services, setServices] = useState<ServiceProps[]>([]);
  const [loading, setLoading] = useState(true);
  const locale = useLocale();
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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
    if (services.length > 0 && cardsContainerRef.current) {
      const cards = cardsRef.current.filter(
        (card): card is HTMLDivElement => card !== null
      );

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        }
      );

      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.3,
          });
        });
      });
    }
  }, [services]);

  return (
    <div className="overflow-hidden lg:py-20 mt-12">
      <div
        ref={cardsContainerRef}
        className="flex sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8 overflow-x-auto sm:overflow-x-visible pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide sm:scrollbar-default"
      >
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-64 sm:w-auto">
                <ServicesCardSkeleton />
              </div>
            ))
          : services.slice(0, 5).map((service, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="flex-shrink-0 w-64 sm:w-auto transition-all duration-300"
              >
                <ServicesCard service={service} />
              </div>
            ))}
      </div>
      <div className="flex justify-center items-center mt-12">
        <Link href={`${locale}/services`}>
          <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-black text-white font-semibold text-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            <div className="flex items-center justify-center">
              <span className="mr-2">See all services</span>
              <FaChevronRight className="text-xs" />
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};
