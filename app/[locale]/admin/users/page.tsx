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
import UserActions from "@/app/components/UserActions";

const fetchUsers = async () => {
  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return users;
};

const UsersPage = async () => {
  const users = await fetchUsers();
  const totalUsers = users.length;

  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 py-4">
        <Card className="bg-gradient-to-tl from-blue-500 via-indigo-600 to-purple-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white font-semibold">
              Total Users
            </CardTitle>
            <CardDescription className="text-3xl font-semibold text-white">
              {totalUsers}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
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
                          {user && user.username
                            ? user.username.charAt(0).toUpperCase()
                            : ""}
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
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersPage;

//------------------------------------

// import { GetServerSideProps } from "next";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableCell,
//   TableBody,
//   TableHead,
// } from "@/app/components/ui/table";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/app/components/ui/card";
// import { Button } from "@/app/components/ui/button";
// import Image from "next/image";
// import { useTranslations } from "next-intl";

// interface UsersPageProps {
//   users: any[];
// }

// const UsersPage: React.FC<UsersPageProps> = ({ users }) => {
//   const t = useTranslations("Tables");
//   const totalUsers = users.length;

//   const handleDelete = async (userId: string) => {
//     try {
//       const response = await fetch(`/api/users/${userId}/delete`, {
//         method: "DELETE",
//       });
//       if (!response.ok) {
//         throw new Error(`Error deleting user: ${response.statusText}`);
//       }
//       window.location.reload();
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 py-4">
//         <Card className="bg-gradient-to-tl from-blue-500 via-indigo-600 to-purple-700">
//           <CardHeader className="pb-3">
//             <CardTitle className="text-white font-semibold">
//               {t("total_users")}
//             </CardTitle>
//             <CardDescription className="text-3xl font-semibold text-white">
//               {totalUsers}
//             </CardDescription>
//           </CardHeader>
//         </Card>
//       </div>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>{t("username")}</TableHead>
//             <TableHead>{t("email")}</TableHead>
//             <TableHead>{t("created_at")}</TableHead>
//             <TableHead>{t("actions")}</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {users.length > 0 ? (
//             users.map((user) => (
//               <TableRow key={user.id}>
//                 <TableCell>
//                   <div className="flex items-center">
//                     <div className="mr-4 relative w-9 h-9 overflow-hidden rounded-full">
//                       {user.profilePicture ? (
//                         <Image
//                           src={user.profilePicture}
//                           alt={user.username}
//                           layout="fill"
//                           objectFit="cover"
//                           className="rounded-full border border-indigo-700"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-gray-300">
//                           {user && user.username
//                             ? user.username.charAt(0).toUpperCase()
//                             : ""}
//                         </div>
//                       )}
//                     </div>
//                     <div>{user.username}</div>
//                   </div>
//                 </TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>
//                   {new Date(user.createdAt).toLocaleDateString()}
//                 </TableCell>
//                 <TableCell>
//                   <Button
//                     onClick={() => handleDelete(user.id)}
//                     variant="destructive"
//                   >
//                     {t("delete")}
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={4} className="text-center">
//                 {t("no_users")}
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`
//     );
//     const data = await response.json();

//     return {
//       props: {
//         users: data.users,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return {
//       props: {
//         users: [],
//       },
//     };
//   }
// };

// export default UsersPage;
