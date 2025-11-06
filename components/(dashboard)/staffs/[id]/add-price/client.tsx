"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IService } from "@/definitions/service";
import { ServiceHeader } from "./header";
import ServiceModal from "@/components/ui/modal";
import { ServiceList } from "./list";
import ServiceFilter from "./filter";
import AddArtistPriceForm from "../add-price-form";
import { useRouter } from "next/navigation";

interface Props {
  initialServices: IService[];
  categories: { id: string; name: string }[];
  staffId: string;
}

export function ServiceClientPage({
  initialServices,
  categories,
  staffId,
}: Props) {
  const router = useRouter();
  const [services, setServices] = useState<IService[]>(initialServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<IService | null>(null);

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

  const handleAdd = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEdit = (service: IService) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <ServiceHeader onAdd={handleAdd} staffId={staffId} />

      <ServiceFilter
        categories={categories}
        onFilterChange={handleFilterChange}
      />

      <ServiceList initialServices={filteredServices} onEdit={handleEdit} />

      <ServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {editingService && (
          <AddArtistPriceForm
            service={editingService}
            artistPrice={{ staffId }}
            onClose={() => {
              setIsModalOpen(false);
              router.replace(`/staff/${staffId}`);
            }}
          />
        )}
      </ServiceModal>
    </motion.div>
  );
}
