"use client";
import { useEffect, useState } from "react";
import ReviewCard from "@/app/components/ReviewCard";
import { Review } from "@/types/index";
import { useTranslations } from "next-intl";

export const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const t = useTranslations("Reviews");

  const fetchReviews = async () => {
    const response = await fetch("/api/reviews");
    const data = await response.json();
    setReviews(data.reviews);
  };

  useEffect(() => {
    fetchReviews();
  }, []);


  return (
    <section
      className="min-h-screen mx-auto py-12 rounded-md bg-gradient-to-bl from-rose-100 to-teal-100"
      id="reviews"
    >
      <div className="container mx-auto px-4">
        <h2 className="font-semibold text-lg md:text-2xl lg:text-3xl text-black mb-8">
          {t("what_people_say")}
        </h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0.6).map((review) => (
            <div key={review.id} className="h-full">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
