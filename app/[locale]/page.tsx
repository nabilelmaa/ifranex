import { Hero } from "@/app/components/Hero";
import { Reviews } from "@/app/components/Reviews";
import { MobileApp } from "@/app/components/MobileApp";
import { WhyUs } from "@/app/components/WhyUs";
import { Services } from "@/app/components/Services";
import { HowItWorks } from "@/app/components/HowItWorks";

export default function Home() {
  return (
    <div className="lg:px-12 md:px-12">
      <Hero />
      <Services />
      <HowItWorks />
      <WhyUs />
      <Reviews />
      <MobileApp />
    </div>
  );
}
