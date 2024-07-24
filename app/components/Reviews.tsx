"use client";
import { useEffect, useState } from "react";
import ReviewCard from "@/app/components/ReviewCard";
// import { ReviewForm } from "@/components/forms/ReviewForm";
import { Review } from "@/types/index";

export const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchReviews = async () => {
    const response = await fetch("/api/reviews");
    const data = await response.json();
    setReviews(data.reviews);
  };

  
  // const handleReviewSubmit = async (review) => {
  //   await fetch("/api/reviews", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(review),
  //   });
  //   fetchReviews();
  // };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <section className="container mx-auto py-8 px-4" id="reviews">
      {/* <ReviewForm onSubmit={handleReviewSubmit} /> */}
      <h2 className="text-2xl font-semibold mb-6 text-center">Reviews</h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div key={review.id} className="w-full">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    </section>
  );
};
