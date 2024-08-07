import { Hero } from "@/app/components/Hero";
import { Reviews } from "@/app/components/Reviews";
import { MobileApp } from "@/app/components/MobileApp";
import { WhyUs } from "@/app/components/WhyUs";
import { Services } from "@/app/components/Services";
import { HowItWorks } from "@/app/components/HowItWorks";

export default function Home() {
  return (
    <div className="min-h-screen p-6 lg:p-12">
      <Hero />
      <Services />
      <HowItWorks />
      <WhyUs />
      <Reviews />
      <MobileApp />
    </div>
  );
}
