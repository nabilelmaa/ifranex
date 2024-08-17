"use client";

import { useState, useEffect } from "react";
import { Service } from "@/types/index";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import Image from "next/image";
import { ServiceForm } from "@/app/components/forms/ServiceForm";
import { useToast } from "@/contexts/ToastContext";
import { lineWobble } from "ldrs";
import { useTranslations } from "next-intl";

const ManageServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const { showToast } = useToast();
  const t = useTranslations("Tables");

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/services/get");
      const data = await response.json();
      setServices(data);

      const uniqueCategories = Array.from(
        new Set(data.map((service: any) => service.category))
      ) as string[];

      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);

  const handleAddClick = () => {
    setServiceToEdit(null);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id: string) => {
    try {
      await fetch("/api/services/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      setServices((prevServices) =>
        prevServices.filter((service) => service.id !== id)
      );
      showToast(t("service_deleted"), "success");
      fetchServices();
    } catch (error) {
      showToast(t("error_deleting"), "error");
    }
  };

  const handleToggleVisibility = async (
    id: string,
    currentHiddenStatus: boolean
  ) => {
    try {
      const newHiddenStatus = !currentHiddenStatus;
      await fetch("/api/services/visibility", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, hidden: newHiddenStatus }),
      });
      showToast(t("visibility_changed"), "success");
      fetchServices();
    } catch (error) {
      console.error("Error toggling visibility:", error);
    }
  };

  const handleEditClick = (service: Service) => {
    setServiceToEdit(service);
    setIsModalOpen(true);
  };

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
    <div className="min-h-screen container mx-auto custom-cursor-auto">
      <h1 className="text-2xl font-semibold mb-4">{t("manage_services")}</h1>
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder={t("search_services")}
            className="w-full custor-cursor-text"
          />
        </div>
        <Button onClick={handleAddClick} className="flex items-center">
          {" "}
          <Image src="/plus.svg" alt="plus" width={15} height={15} />
          <p className="ml-2 custom-cursor-pointer">{t("add_service")}</p>
        </Button>
      </div>

      <Table className="custom-cursor-auto">
        <TableCaption>{t("list_of_available_services")}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>{t("category")}</TableHead>
            <TableHead>{t("en_title")}</TableHead>
            <TableHead>{t("en_description")}</TableHead>
            <TableHead>{t("fr_title")}</TableHead>
            <TableHead>{t("fr_description")}</TableHead>
            <TableHead>{t("price")} (MAD)</TableHead>
            <TableHead>{t("banner")}</TableHead>
            <TableHead>{t("actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell>{service.category}</TableCell>
              <TableCell>{service.title_en}</TableCell>
              <TableCell>{service.description_en}</TableCell>
              <TableCell>{service.title_fr}</TableCell>
              <TableCell>{service.description_fr}</TableCell>
              <TableCell>{service.pricePerHour}</TableCell>
              <TableCell>
                <Image
                  src={service.banner}
                  alt="Banner"
                  width={50}
                  height={50}
                  className="rounded-md h-12 w-12"
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-between space-x-2">
                  <Button
                    onClick={() => handleEditClick(service)}
                    variant="ghost"
                    className="p-2 custom-cursor-pointer"
                  >
                    <Image
                      src="/update.svg"
                      alt="Update"
                      width={22}
                      height={22}
                      className="min-w-[22x] min-h-[22px]"
                    />
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(service.id)}
                    variant="ghost"
                    className="p-2 custom-cursor-pointer"
                  >
                    <Image
                      src="/trash.svg"
                      alt="Delete"
                      width={22}
                      height={22}
                      className="min-w-[22x] min-h-[22px]"
                    />
                  </Button>
                  <Button
                    onClick={() =>
                      handleToggleVisibility(service.id, service.hidden)
                    }
                    variant="ghost"
                    className="p-2"
                  >
                    <Image
                      src={service.hidden ? "/eye-on.svg" : "/eye-off.svg"}
                      alt="Visibility"
                      width={22}
                      height={22}
                      className="min-w-[22x] min-h-[22px] custom-cursor-pointer"
                    />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>{t("total_services")}</TableCell>
            <TableCell>{services.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <ServiceForm
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        serviceToEdit={serviceToEdit}
        categories={categories}
      />
    </div>
  );
};

export default ManageServices;
