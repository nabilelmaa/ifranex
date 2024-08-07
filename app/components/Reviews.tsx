"use client";
import React, { useEffect, useState } from "react";
import ReviewCard from "@/app/components/ReviewCard";
import { Review } from "@/types/index";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/app/components/ui/skeleton";

export const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("Reviews");

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

  useEffect(() => {
    fetchReviews();
  }, []);

  const ReviewSkeleton = () => (
    <div className="bg-white p-6 rounded-xl shadow-md animate-pulse">
      <div className="space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="flex items-center mt-4 space-x-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );

  return (
    <section
      className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-100"
      id="reviews"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
        <h2 className="text-xl lg:text-3xl md:text-2xl font-bold text-gray-900 mb-4">
            {t("what_people_say")}
          </h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array(6)
                .fill(0)
                .map((_, index) => <ReviewSkeleton key={index} />)
            : reviews.slice(0, 6).map((review) => (
                <div key={review.id} className="h-full">
                  <ReviewCard review={review} />
                </div>
              ))}
        </div>
        {/* {!loading && reviews.length > 6 && (
          <div className="text-center mt-12">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors duration-300">
              {t("load_more_reviews")}
            </button>
          </div>
        )} */}
      </div>
    </section>
  );
};

export default Reviews;
