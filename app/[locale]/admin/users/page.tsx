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

const UsersPage = () => {
  const [users, setUsers] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

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
      showToast("User deleted successfully!", "success");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      showToast("Error deleting user", "error");
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
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Total Users</CardTitle>
            <CardDescription className="text-4xl font-bold">
              {totalUsers}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <h1 className="text-2xl font-bold mb-4">Users</h1>
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
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDelete(user.id)}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No users available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersPage;
