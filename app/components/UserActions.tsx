"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/contexts/ToastContext";
import { useTranslations } from "next-intl";

interface UserActionsProps {
  userId: string;
}

const UserActions: React.FC<UserActionsProps> = ({ userId }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { showToast } = useToast();
  const t = useTranslations("Tables");

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/users/${userId}/delete`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error deleting user: ${response.statusText}`);
      }
      showToast(t("user_deleted"), "success");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
      showToast(t("error_deleting_user"), "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      onClick={handleDelete}
      variant="destructive"
      disabled={isDeleting}
      className="custom-cursor-pointer"
    >
      {isDeleting ? t("deleting") : t("delete")}
    </Button>
  );
};

export default UserActions;
