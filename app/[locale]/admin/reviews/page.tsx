"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@/app/components/ui/table";
import { useToast } from "@/contexts/ToastContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/app/components/ui/card";
import { useTranslations } from "next-intl";
import { lineWobble } from "ldrs";

interface Review {
  user: any;
  id: string;
  username: string;
  email: string;
  rating: number;
  comment: string;
  timestamp: string;
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("Tables");

  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/reviews");
      if (!response.ok) {
        showToast(t("reviews_not_loaded"), "error");
      }
      const data = await response.json();
      setReviews(data.reviews);
      showToast(t("reviews_loaded"), "alert");
    } catch (error) {
      showToast("error", "error");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  lineWobble.register();

  if (isLoading) {
    return (
      <div className="min-h-screen container mx-auto flex items-center justify-center">
        <l-line-wobble
          size="80"
          stroke="5"
          bg-opacity="0.1"
          speed="1.75"
          color="black"
        ></l-line-wobble>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 custom-cursor-auto">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 py-4">
        <Card className="bg-gradient-to-tl from-blue-500 via-indigo-600 to-purple-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white font-semibold">
              {t("total_reviews")}
            </CardTitle>
            <CardDescription className="text-3xl font-semibold text-white">
              {reviews.length}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("username")}</TableHead>
            <TableHead>{t("email")}</TableHead>
            <TableHead>{t("rating")}</TableHead>
            <TableHead>{t("comment")}</TableHead>
            <TableHead>{t("created_at")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell>
                <div className="flex items-center">
                  <div className="mr-4 relative w-9 h-9 overflow-hidden rounded-full">
                    {review.user.profilePicture ? (
                      <Image
                        src={review.user.profilePicture}
                        alt={review.user.username}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full border border-indigo-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-300">
                        {review.user.username?.charAt(0).toUpperCase() || ""}
                      </div>
                    )}
                  </div>
                  <div>{review.user.username}</div>
                </div>
              </TableCell>
              <TableCell>{review.user.email}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`shrink-0 size-4 ${
                        i < review.rating ? "text-yellow-400" : "text-gray-400"
                      } transition-colors duration-300`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                    </svg>
                  ))}
                </div>
              </TableCell>
              <TableCell>{review.comment}</TableCell>
              <TableCell>
                {new Date(review.timestamp).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
