import Image from "next/image";
import { TypewriterEffect } from "@/app/components/ui/typewriter-effect";
import Link from "next/link";
import { useLocale } from "next-intl";

export const Hero = () => {
  const locale = useLocale();
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const enWords = [
    { text: "Find" },
    {
      text: "Trusted",
      className: "text-rose-500",
    },
    { text: "Handypersons" },
    { text: "for" },
    {
      text: "Every",
      className: "text-rose-500",
    },
    {
      text: "Need",
      className: "text-rose-500",
    },
  ];

  const frWords = [
    { text: "Trouvez" },
    { text: "des" },
    { text: "bricoleurs" },
    { text: "de" },
    {
      text: "confiance",
         className: "text-rose-500",
    },
    { text: "pour " },
    {
      text: "chaque",
         className: "text-rose-500",
    },
    {
      text: "besoin",
      className: "text-rose-500",
    },
  ];

  const content = {
    en: {
      words: enWords,
      description: (
        <>
          Welcome to , your trusted partner for all home repair and handywork
          needs. Whether it's a minor fix or a major renovation, our skilled
          professionals are here to provide top-notch service with a smile. From
          plumbing and electrical work to carpentry and painting, we handle it
          all with precision and care. Let us help you keep your home in perfect
          shape, so you can enjoy the comfort and peace of mind you deserve.
          Book your service today and experience the difference with{" "}
        </>
      ),
      getStarted: "Get Started",
      howItWorks: "How it works?",
    },
    fr: {
      words: frWords,
      description: (
        <>
          Bienvenue chez , votre partenaire de confiance pour tous vos besoins
          de réparation et de bricolage à domicile. Qu'il s'agisse d'une petite
          réparation ou d'une rénovation majeure, nos professionnels qualifiés
          sont là pour vous offrir un service de première qualité avec le
          sourire. De la plomberie et des travaux électriques à la menuiserie et
          à la peinture, nous nous occupons de tout avec précision et soin.
          Laissez-nous vous aider à garder votre maison en parfait état, afin
          que vous puissiez profiter du confort et de la tranquillité d'esprit
          que vous méritez. Réservez votre service dès aujourd'hui et découvrez
          la différence avec{" "}
        </>
      ),
      getStarted: "Commencer",
      howItWorks: "Comment ça marche ?",
    },
  };

  const { words, description, getStarted, howItWorks } =
    content[locale as keyof typeof content];

  return (
    <div className="lg:py-16 md:py-16">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap xl:items-center -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-16 md:mb-0">
            <h1 className="text-3xl md:text-5xl lg:text-6xl leading-tight font-bold tracking-tight lg:h-[10rem] mt-20">
              <TypewriterEffect words={words} />
            </h1>
            <p className="text-neutral-600 dark:text-neutral-200 text-md sm:text-base mt-6 mb-6">
              {description}
            </p>
            <div className="flex flex-wrap">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 lg:mt-24 w-full">
                <Link href={`/${locale}/services`}>
                  <button className="w-full lg:w-40 md:w-40 h-10 rounded-xl bg-indigo-700 border dark:border-white border-transparent text-white text-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                    {getStarted}
                  </button>
                </Link>
                <button
                  className="w-full lg:w-40 md:w-40 h-10 rounded-xl bg-white text-black border border-indigo-700  text-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                  // onClick={() => scrollToSection("how-it-works")}
                >
                  {howItWorks}
                </button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4">
            <div className="relative mx-auto md:mr-0 max-w-max">
              <Image
                src="/circle3-yellow.svg"
                alt=""
                width={45}
                height={45}
                className="absolute z-10 -left-14 -top-12 w-28 md:w-auto"
              />
              <Image
                src="/dots3-blue.svg"
                alt=""
                width={45}
                height={45}
                className="absolute z-10 -right-7 -bottom-8 w-28 md:w-auto"
              />
              <Image
                src="https://res.cloudinary.com/dcncaesb0/image/upload/v1718902555/hrh-ifrane/bdlwaqzjihochxude97o.jpg"
                alt=""
                width={400}
                height={300}
                className="relative rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
