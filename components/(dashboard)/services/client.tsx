"use client";

import { useState, useEffect } from "react";
import { ServiceHeader } from "./header";
import ServiceModal from "./modal";
import ServiceAddForm from "./add-form";
import { ServiceList } from "./list";
import { IService } from "@/definitions/service";
import { deleteServiceAction } from "@/actions/service";
import { getServices } from "@/services/service";
import { motion } from "framer-motion";
import DeleteModal from "./delete-modal";

interface Props {
  initialServices: IService[];
}

export function ServiceClientPage({ initialServices }: Props) {
  const [services, setServices] = useState<IService[]>(initialServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<IService | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingService, setDeletingService] = useState<IService | null>(null);

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

  const handleAdd = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEdit = (service: IService) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleDelete = async (service: IService) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    const res = await deleteServiceAction(
      service.id || "",
      service.imageUrl || ""
    );
    if (res?.success) fetchServices();
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <ServiceHeader onAdd={handleAdd} />

      <ServiceList
        initialServices={services}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

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
