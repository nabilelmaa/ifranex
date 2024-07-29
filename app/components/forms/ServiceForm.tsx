"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
  const router = useRouter();
  const locale = useLocale();

  const [selectedCategory, setSelectedCategory] = useState<string>(
    serviceToEdit?.category || (categories.length > 0 ? categories[0] : "")
  );

  useEffect(() => {
    if (serviceToEdit) {
      setValue("banner", serviceToEdit.banner);
      setValue("pricePerHour", serviceToEdit.pricePerHour);
      setValue("category", serviceToEdit.category);
      setValue("title_en", serviceToEdit.title_en);
      setValue("description_en", serviceToEdit.description_en);
      setValue("title_fr", serviceToEdit.title_fr);
      setValue("description_fr", serviceToEdit.description_fr);
      setValue("hidden", serviceToEdit.hidden);
    }
  }, [serviceToEdit, setValue]);

  const onSubmit = async (data: any) => {
    if (!selectedCategory) {
      showToast("Please select a category", "error");
      return;
    }

    try {
      const endpoint = serviceToEdit
        ? `/api/services/update?id=${serviceToEdit.id}`
        : "/api/services/create";
      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, category: selectedCategory }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to update service");
      }
      showToast(
        serviceToEdit
          ? "Service updated successfully!"
          : "Service added to database!",
        "alert"
      );
      router.push(`/${locale}/admin/services`);
    } catch (error) {
      console.error("Error managing service:", error);
      showToast("Error managing service", "error");
    } finally {
      closeModal();
      reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {serviceToEdit ? "Edit Service" : "Add New Service"}
          </DialogTitle>
          <DialogDescription>
            {serviceToEdit
              ? "Update the details of the service."
              : "Fill in the details to add a new service."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="banner">Banner URL</Label>
            <Input id="banner" {...register("banner", { required: true })} />
          </div>

          <div>
            <Label htmlFor="pricePerHour">Price Per Hour</Label>
            <Input
              id="pricePerHour"
              type="number"
              step="0.01"
              {...register("pricePerHour", { required: true })}
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
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
            <Label htmlFor="title_en">English Title</Label>
            <Input
              id="title_en"
              {...register("title_en", { required: true })}
            />
          </div>

          <div>
            <Label htmlFor="description_en">English Description</Label>
            <Input
              id="description_en"
              {...register("description_en", { required: true })}
            />
          </div>

          <div>
            <Label htmlFor="title_fr">French Title</Label>
            <Input
              id="title_fr"
              {...register("title_fr", { required: true })}
            />
          </div>

          <div>
            <Label htmlFor="description_fr">French Description</Label>
            <Input
              id="description_fr"
              {...register("description_fr", { required: true })}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit">
              {serviceToEdit ? "Update Service" : "Add Service"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
