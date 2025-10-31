"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IService } from "@/definitions/service";
import { ICategory } from "@/definitions/category";

import { ServiceHeader } from "./header";
import ServiceModal from "./modal";
import ServiceAddForm from "./add-form";
import { ServiceList } from "./list";
import ServiceFilter from "./filter";
import DeleteModal from "./delete-modal"; // reusable modal component
import { deleteServiceAction } from "@/actions/service";
import { getServices } from "@/services/service";

interface Props {
  initialServices: IService[];
  categories: ICategory[];
}

export function ServiceClientPage({ initialServices, categories }: Props) {
  const [services, setServices] = useState<IService[]>(initialServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<IService | null>(null);
  const [deleteService, setDeleteService] = useState<IService | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingService, setDeletingService] = useState<IService | null>(null);

  const [filterState, setFilterState] = useState({
    text: "",
    categoryId: "all" as string | "all",
  });

  // Filtered services derived from state
  const filteredServices = services.filter((s) => {
    const matchesText = s.name
      .toLowerCase()
      .includes(filterState.text.toLowerCase());
    const matchesCategory =
      filterState.categoryId === "all" ||
      s.categoryId === filterState.categoryId;
    return matchesText && matchesCategory;
  });

  // Filter handler
  const handleFilterChange = ({
    text,
    categoryId,
  }: {
    text: string;
    categoryId: string | "all";
  }) => {
    setFilterState({ text, categoryId });
  };

  const handleDeleteClick = (service: IService) => {
    setDeletingService(service);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingService) return;
    const res = await deleteServiceAction(
      deletingService.id || "",
      deletingService.imageUrl || ""
    );
    if (res?.success) {
      setServices((prev) => prev.filter((s) => s.id !== deletingService.id));
    }
    setIsDeleteOpen(false);
    setDeletingService(null);
  };

  const fetchServices = async () => {
    const res = await getServices();
    if (res?.success) setServices(res.data || []);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Filter handler
  /* const handleFilterChange = ({
    text,
    categoryId,
  }: {
    text: string;
    categoryId: string | "all";
  }) => {
    setFilteredServices(
      services.filter((s) => {
        const matchesText = s.name.toLowerCase().includes(text.toLowerCase());
        const matchesCategory =
          categoryId === "all" || s.categoryId === categoryId;
        return matchesText && matchesCategory;
      })
    );
  }; */

  const handleAdd = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEdit = (service: IService) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  /*   const handleDeleteClick = (service: IService) => {
    setDeleteService(service);
  }; */

  /* const confirmDelete = async () => {
    if (!deleteService) return;
    const res = await deleteServiceAction(
      deleteService.id || "",
      deleteService.imageUrl || ""
    );
    if (res?.success) {
      setServices((prev) => prev.filter((s) => s.id !== deleteService.id));
      setFilteredServices((prev) =>
        prev.filter((s) => s.id !== deleteService.id)
      );
    }
    setDeleteService(null);
  };

  const handleSave = (newService: IService) => {
    setServices((prev) => {
      const exists = prev.find((s) => s.id === newService.id);
      if (exists)
        return prev.map((s) => (s.id === newService.id ? newService : s));
      return [newService, ...prev];
    });
    setFilteredServices((prev) => {
      const exists = prev.find((s) => s.id === newService.id);
      if (exists)
        return prev.map((s) => (s.id === newService.id ? newService : s));
      return [newService, ...prev];
    });
  }; */

  useEffect(() => {
    setServices(services);
  }, [services]);

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <ServiceHeader onAdd={handleAdd} />

      <ServiceFilter
        categories={categories}
        onFilterChange={handleFilterChange}
      />

      <ServiceList
        initialServices={filteredServices}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {/* Add/Edit Sheet */}
      {/* <ServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ServiceAddForm
          service={editingService}
          categories={categories}
          onSuccess={(service) => {
            handleSave(service);
            setIsModalOpen(false);
          }}
        />
      </ServiceModal> */}

      {/* Delete Confirmation Modal */}
      {/* {deleteService && (
        <DeleteModal
          title="Delete Service"
          description={`Are you sure you want to delete ${deleteService.name}?`}
          onCancel={() => setDeleteService(null)}
          onConfirm={confirmDelete}
        />
      )} */}

      <ServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ServiceAddForm
          service={editingService}
          onClose={() => {
            setIsModalOpen(false);
            fetchServices();
          }}
        />
      </ServiceModal>

      <DeleteModal
        isOpen={isDeleteOpen}
        onCancel={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={deletingService?.name || ""}
      />
    </motion.div>
  );
}
