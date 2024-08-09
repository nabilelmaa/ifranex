"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TypewriterEffect } from "@/app/components/ui/typewriter-effect";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Review } from "@/types/index";
import { Skeleton } from "@/app/components/ui/skeleton";

export const Hero = () => {
  const locale = useLocale();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/reviews");
      const data = await response.json();
      setReviews(data.reviews);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const enWords = [
    { text: "Find" },
    { text: "Trusted", className: "text-primaryCol" },
    { text: "Handypersons" },
    { text: "for" },
    { text: "Every", className: "text-primaryCol" },
    { text: "Need", className: "text-primaryCol" },
  ];

  const frWords = [
    { text: "Trouvez", className: "text-textCol" },
    { text: "bricoleurs", className: "text-textCol" },
    { text: "de", className: "text-textCol" },
    { text: "confiance", className: "text-primaryCol" },
    { text: "pour", className: "text-textCol" },
    { text: "chaque", className: "text-primaryCol" },
    { text: "besoin", className: "text-primaryCol" },
  ];

  const content = {
    en: {
      words: enWords,
      description: (
        <>
          Your trusted partner for all home repair and handywork needs. Whether
          it's a minor fix or a major renovation, our skilled professionals are
          here to provide top-notch service with a smile. From plumbing and
          electrical work to carpentry and painting, we handle it all with
          precision and care. Let us help you keep your home in perfect shape.
          Book your service today and experience the difference.
        </>
      ),
      getStarted: "Get Started",
    },
    fr: {
      words: frWords,
      description: (
        <>
          "Votre partenaire de confiance pour tous vos besoins en réparation et
          travaux à domicile. Que ce soit pour une petite réparation ou une
          rénovation majeure, nos professionnels qualifiés sont là pour vous
          offrir un service de qualité avec le sourire. De la plomberie et
          l'électricité à la menuiserie et la peinture, nous nous occupons de
          tout avec précision et soin. Laissez-nous vous aider à garder votre
          maison en parfait état. Réservez votre service dès aujourd'hui et
          faites la différence."
        </>
      ),
      getStarted: "Commencer",
    },
  };

  const { words, description, getStarted } =
    content[locale as keyof typeof content];

  return (
    <div className="lg:py-16 md:py-16 overflow-hidden">
      <div className="px-4">
        <div className="flex flex-wrap xl:items-center -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-16 md:mb-0">
            <h1 className="text-3xl md:text-5xl lg:text-6xl leading-tight font-bold tracking-tight lg:h-[10rem] mt-24 md:mt-16">
              <TypewriterEffect words={words} />
            </h1>
            <p className="text-neutral-600 dark:text-neutral-200 text-md sm:text-base mt-6 mb-6">
              {description}
            </p>
            <div className="flex items-center flex-wrap">
              <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between lg:mt-16 w-full">
                <Link href={`/${locale}/services`}>
                  <button className="w-full md:w-auto lg:w-40 h-10 rounded-xl bg-secondaryCol border dark:border-white border-transparent text-primaryCol text-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-primaryCol focus:ring-opacity-50">
                    {getStarted}
                  </button>
                </Link>

                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-6 rtl:space-x-reverse">
                        {[...Array(5)].map((_, index) => (
                          <Skeleton
                            key={index}
                            className="w-12 h-12 rounded-full"
                          />
                        ))}
                      </div>

                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, index) => (
                          <Skeleton key={index} className="w-4 h-4 rounded" />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between space-x-2 w-full md:w-auto">
                      <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                        {reviews
                          .filter((review) => review.user.profilePicture)
                          .slice(0, 5)
                          .map((review, index) => (
                            <div className="avatar" key={index}>
                              <div className="w-12 rounded-full">
                                <Image
                                  src={review.user.profilePicture}
                                  alt={`Review by ${review.user.name}`}
                                  width={40}
                                  height={40}
                                  className="rounded-full"
                                />
                              </div>
                            </div>
                          ))}
                      </div>

                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            className="shrink-0 size-4 text-yellow-400 transition-colors duration-300"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                          </svg>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
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
                className="absolute z-10 -left-14 -top-12 w-20 md:w-auto"
              />
              <Image
                src="/dots3-blue.svg"
                alt=""
                width={45}
                height={45}
                className="absolute z-10 -right-7 -bottom-8 w-20 md:w-auto"
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
