"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Hero } from "@/app/components/Hero";
import { Reviews } from "@/app/components/Reviews";
import { MobileApp } from "@/app/components/MobileApp";
import { WhyUs } from "@/app/components/WhyUs";
import { Services } from "@/app/components/Services";
import { HowItWorks } from "@/app/components/HowItWorks";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="lg:px-12 md:px-12">
      <div data-aos="fade-up">
        <Hero />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <Services />
      </div>
      <div data-aos="fade-up" data-aos-delay="200">
        <HowItWorks />
      </div>
      <div data-aos="fade-up" data-aos-delay="300">
        <WhyUs />
      </div>
      <div data-aos="fade-up" data-aos-delay="400">
        <Reviews />
      </div>
      <div data-aos="fade-up" data-aos-delay="500">
        <MobileApp />
      </div>
    </div>
  );
}
