import { db } from "@/lib/db";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@/app/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/app/components/ui/card";
import Image from "next/image";


interface User {
  profilePicture?: string;
  username: string;
  email: string;
}

interface Review {
  id: string;
  user: User;
  rating: number;
  comment: string;
  timestamp: string;
}

const translations: { [key: string]: { [key: string]: string } } = {
  en: {
    username: "Username",
    email: "Email",
    rating: "Rating",
    comment: "Comment",
    createdAt: "Created At",
    total_reviews: "Total Reviews",
    no_reviews_found: "No reviews found",
  },
  fr: {
    username: "Nom d'utilisateur",
    email: "Email",
    rating: "Évaluation",
    comment: "Commentaire",
    createdAt: "Créé le",
    total_reviews: "Nombre total d'avis",
    no_reviews_found: "Aucun avis trouvé",
  },
};

const fetchReviews = async (): Promise<Review[]> => {
  return await db.review.findMany({
    include: {
      user: true,
    },
    orderBy: {
      timestamp: "desc",
    },
  });
};

const AdminReviews = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const reviews = await fetchReviews();
  const t = translations[locale] || translations.en;

  return (
    <div className="container mx-auto p-4 custom-cursor-auto">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 py-4">
        <Card className="bg-gradient-to-tl from-blue-500 via-indigo-600 to-purple-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white font-semibold">
              {t.total_reviews}
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
            <TableHead>{t.username}</TableHead>
            <TableHead>{t.email}</TableHead>
            <TableHead>{t.rating}</TableHead>
            <TableHead>{t.comment}</TableHead>
            <TableHead>{t.createdAt}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.length > 0 ? (
            reviews.map((review: Review) => (
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
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                {t.no_reviews_found}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminReviews;
