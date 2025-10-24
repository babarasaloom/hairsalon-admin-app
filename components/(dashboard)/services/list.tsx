"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ServiceCard } from "./card";
import { IService } from "@/definitions/service";

interface ServiceListProps {
  initialServices: IService[];
  onEdit: (service: IService) => void;
  onDelete: (service: IService) => void;
}

export function ServiceList({
  initialServices,
  onEdit,
  onDelete,
}: ServiceListProps) {
  return (
    <motion.div
      layout
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <AnimatePresence>
        {initialServices.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-gray-500 text-center col-span-full py-10"
          >
            No services yet. Add your first one!
          </motion.p>
        ) : (
          initialServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onEdit={() => onEdit(service)}
              onDelete={() => onDelete(service)}
            />
          ))
        )}
      </AnimatePresence>
    </motion.div>
  );
}
