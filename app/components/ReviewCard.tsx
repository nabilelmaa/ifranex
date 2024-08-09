import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Review } from "@/types/index";
import Image from "next/image";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;

    if (card && content) {
      gsap.set(card, { autoAlpha: 0, y: 50 });
      gsap.set(content.children, { autoAlpha: 0, y: 20 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(card, { autoAlpha: 1, y: 0, duration: 0.6 }).to(
        content.children,
        { autoAlpha: 1, y: 0, stagger: 0.1 },
        "-=0.2"
      );

      card.addEventListener("mouseenter", () => {
        gsap.to(card, { scale: 1.03, duration: 0.3 });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, { scale: 1, duration: 0.3 });
      });
    }
  }, []);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`shrink-0 size-4 ${
            i < rating ? "text-yellow-400" : "text-gray-400"
          } transition-colors duration-300`}
          xmlns="http://www.w3.org/2000/svg"
          width="6"
          height="6"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-100 p-6 rounded-xl">
      <p className="flex-grow mb-4">{review.comment}</p>
      <div className="flex items-start mt-auto">
        <div className="mr-4 relative w-10 h-10 overflow-hidden rounded-full flex-shrink-0">
          {review.user.profilePicture ? (
            <Image
              src={review.user.profilePicture}
              alt="profile-picture"
              layout="fill"
              objectFit="cover"
              className="rounded-full border border-indigo-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300 text-white font-semibold">
              {review.user.username.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex-grow">
          <p className="font-medium">{review.user.username}</p>
          <div className="flex justify-between items-center mt-1">
            <div className="flex">{renderStars(review.rating)}</div>
            <p className="text-sm text-gray-600">
              {new Date(review.timestamp).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
