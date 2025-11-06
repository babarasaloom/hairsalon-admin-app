"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ServiceCard } from "./card";
interface ServiceListProps {
  artistPrices?: any[];
  onEdit: (service: any) => void;
  onDelete: (service: any) => void;
}

export function ServiceList({
  artistPrices = [],
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
        {artistPrices.length === 0 ? (
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
          artistPrices.map((service) => (
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
