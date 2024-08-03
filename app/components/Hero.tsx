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
    { text: "Trusted", className: "text-colGreen-000 dark:text-colGreen-000" },
    { text: "Handypersons" },
    { text: "for" },
    { text: "Every", className: "text-colGreen-000 dark:text-colGreen-000" },
    { text: "Need", className: "text-colGreen-000 dark:text-colGreen-000" },
  ];

  const frWords = [
    { text: "Trouvez" },
    { text: "des" },
    { text: "bricoleurs" },
    { text: "de" },
    {
      text: "confiance",
      className: "text-colGreen-000 dark:text-colGreen-000",
    },
    { text: "pour " },
    { text: "chaque", className: "text-colGreen-000 dark:text-colGreen-000" },
    { text: "besoin", className: "text-colGreen-000 dark:text-colGreen-000" },
  ];

  const content = {
    en: {
      words: enWords,
      description:
        "We're different. Flex is the only SaaS business platform that lets you run your business on one platform, seamlessly across all digital channels.",
      getStarted: "Get Started",
      howItWorks: "How it works?",
    },
    fr: {
      words: frWords,
      description:
        "Nous sommes différents. Flex est la seule plateforme commerciale SaaS qui vous permet de gérer votre entreprise sur une seule plateforme, de manière transparente sur tous les canaux numériques.",
      getStarted: "Commencer",
      howItWorks: "Comment ça marche ?",
    },
  };

  const { words, description, getStarted, howItWorks } =
    content[locale as keyof typeof content];

  return (
    <div className="lg:py-20 md:py-20">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap xl:items-center -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-16 md:mb-0">
            <h1 className="text-3xl md:text-5xl lg:text-6xl leading-tight font-bold tracking-tight lg:h-[10rem]">
              <TypewriterEffect words={words} />
            </h1>
            <p className="text-neutral-600 dark:text-neutral-200 text-md sm:text-base mt-6 mb-6">
              {description}
            </p>
            <div className="flex flex-wrap">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 lg:mt-24 w-full">
                <Link href={`/${locale}/services`}>
                  <button className="w-full lg:w-40 md:w-40 h-10 rounded-xl bg-colGreen-000 border dark:border-white border-transparent text-white text-sm">
                    {getStarted}
                  </button>
                </Link>
                <button
                  className="w-full lg:w-40 md:w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm"
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
