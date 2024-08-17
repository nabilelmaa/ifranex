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
import Image from "next/legacy/image";
import UserActions from "@/app/components/UserActions";

interface User {
  id: string;
  profilePicture: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date; 
}



const translations: { [key: string]: { [key: string]: string } } = {
  en: {
    username: "Username",
    email: "Email",
    createdAt: "Created At",
    actions: "Actions",
    total_users: "Total Users",
    no_users_found: "No users found",
  },
  fr: {
    username: "Nom d'utilisateur",
    email: "Email",
    createdAt: "Créé le",
    actions: "Actions",
    total_users: "Nombre total d'utilisateurs",
    no_users_found: "Aucun utilisateur trouvé",
  },
};

const fetchUsers = async (): Promise<User[]> => {
  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return users.map((user: { createdAt: { toISOString: () => any; }; }) => ({
    ...user,
    createdAt: user.createdAt.toISOString(), 
  }));
};


const UsersPage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const users = await fetchUsers();
  const t = translations[locale] || translations.en;

  return (
    <div className="container mx-auto p-4 custom-cursor-auto">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 py-4">
        <Card className="bg-gradient-to-tl from-blue-500 via-indigo-600 to-purple-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white font-semibold">
              {t.total_users}
            </CardTitle>
            <CardDescription className="text-3xl font-semibold text-white">
              {users.length}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t.username}</TableHead>
            <TableHead>{t.email}</TableHead>
            <TableHead>{t.createdAt}</TableHead>
            <TableHead>{t.actions}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center">
                    <div className="mr-4 relative w-9 h-9 overflow-hidden rounded-full">
                      {user.profilePicture ? (
                        <Image
                          src={user.profilePicture}
                          alt={user.username}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-full border border-indigo-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300">
                          {user.username?.charAt(0).toUpperCase() || ""}
                        </div>
                      )}
                    </div>
                    <div>{user.username}</div>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <UserActions userId={user.id} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                {t.no_users_found}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersPage;
