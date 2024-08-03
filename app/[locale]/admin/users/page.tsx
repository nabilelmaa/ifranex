"use client";

import { useState, useEffect } from "react";
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
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/contexts/ToastContext";
import { lineWobble } from "ldrs";
import { useTranslations } from "next-intl";
import Image from "next/image";

const UsersPage = () => {
  const [users, setUsers] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const t = useTranslations("Tables");
  const totalUsers = users.length;

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error(`Error fetching users: ${response.statusText}`);
      }
      const data = await response.json();
      setUsers(data.users);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}/delete`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error deleting user: ${response.statusText}`);
      }
      showToast(t("user_deleted"), "success");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      showToast(t("error_deleting_user"), "error");
    }
  };

  useEffect(() => {
    fetchUsers();
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
    <div className="container mx-auto p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 py-4">
        <Card className="bg-gradient-to-tl from-blue-500 via-indigo-600 to-purple-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white font-semibold">
              {t("total_users")}
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
            <TableHead>{t("username")}</TableHead>
            <TableHead>{t("email")}</TableHead>
            <TableHead>{t("created_at")}</TableHead>
            <TableHead>{t("actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center">
                    <div className="mr-4">
                      {user.profilePicture ? (
                        <Image
                          src={user.profilePicture}
                          alt={user.username}
                          width={35}
                          height={35}
                          className="object-cover rounded-full border border-indigo-700"
                        />
                      ) : (
                        <div className="w-9 h-9 flex rounded-full items-center justify-center bg-gray-300">
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
                  <Button
                    onClick={() => handleDelete(user.id)}
                    variant="destructive"
                  >
                    {t("delete")}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                {t("no_users")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersPage;
