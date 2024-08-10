"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Service } from "@/types/index";
import { useToast } from "@/contexts/ToastContext";

interface ServiceFormProps {
  isOpen: boolean;
  closeModal: () => void;
  serviceToEdit: Service | null;
  categories: string[];
}

export const ServiceForm: React.FC<ServiceFormProps> = ({
  isOpen,
  closeModal,
  serviceToEdit,
  categories,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: serviceToEdit || {
      banner: "",
      pricePerHour: 0,
      category: "",
      title_en: "",
      description_en: "",
      title_fr: "",
      description_fr: "",
      hidden: false,
    },
  });
  const { showToast } = useToast();

  const t = useTranslations("Tables");

  const [selectedCategory, setSelectedCategory] = useState<string>(
    serviceToEdit?.category || (categories.length > 0 ? categories[0] : "")
  );
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (serviceToEdit) {
      Object.keys(serviceToEdit).forEach((key) => {
        setValue(key as keyof Service, serviceToEdit[key as keyof Service]);
      });
    }
  }, [serviceToEdit, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBannerImage(e.target.files[0]);
    }
  };

  const uploadImageToCloudinary = async (image: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
    );

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

    try {
      const response = await axios.post(cloudinaryUrl, formData);
      if (response.status === 200) {
        return response.data.secure_url;
      } else {
        throw new Error("Failed to upload image to Cloudinary");
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary", error);
      throw error;
    }
  };

  const onSubmit = async (data: any) => {
    if (!selectedCategory) {
      showToast(t("select_category"), "error");
      return;
    }

    setIsLoading(true);

    try {
      let bannerUrl = data.banner;

      if (bannerImage) {
        bannerUrl = await uploadImageToCloudinary(bannerImage);
      }

      const endpoint = serviceToEdit
        ? `/api/services/update?id=${serviceToEdit.id}`
        : "/api/services/create";

      const method = serviceToEdit ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          category: selectedCategory,
          banner: bannerUrl,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || t("failed_to_update_service"));
      }

      showToast(
        serviceToEdit ? t("service_updated") : t("service_added"),
        "success"
      );
      window.location.reload();
    } catch (error) {
      showToast((error as Error).message || "Error managing service", "error");
    } finally {
      setIsLoading(false);
      closeModal();
      reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {serviceToEdit ? t("edit_service") : t("add_new_service")}
          </DialogTitle>
          <DialogDescription>
            {serviceToEdit ? t("update_details") : t("fill_details")}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="banner">{t("banner")}</Label>
            <Input
              id="banner"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div>
            <Label htmlFor="pricePerHour">{t("price")}</Label>
            <Input
              id="pricePerHour"
              type="number"
              step="0.01"
              {...register("pricePerHour", { required: true })}
            />
          </div>

          <div>
            <Label htmlFor="category">{t("category")}</Label>
            <Select
              onValueChange={(value) => {
                setSelectedCategory(value);
                setValue("category", value);
              }}
              value={selectedCategory}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="title_en">{t("english_title")}</Label>
            <Input
              id="title_en"
              {...register("title_en", { required: true })}
            />
          </div>

          <div>
            <Label htmlFor="description_en">{t("english_description")}</Label>
            <Input
              id="description_en"
              {...register("description_en", { required: true })}
            />
          </div>

          <div>
            <Label htmlFor="title_fr">{t("french_title")}</Label>
            <Input
              id="title_fr"
              {...register("title_fr", { required: true })}
            />
          </div>

          <div>
            <Label htmlFor="description_fr">{t("french_description")}</Label>
            <Input
              id="description_fr"
              {...register("description_fr", { required: true })}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={closeModal}
              disabled={isLoading}
            >
              {t("cancel")}
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? t("submitting")
                : serviceToEdit
                ? t("update_service")
                : t("add_service")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
