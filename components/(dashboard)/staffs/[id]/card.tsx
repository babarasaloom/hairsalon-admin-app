"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EditIcon, Trash2 } from "lucide-react";

interface ServiceCardProps {
  service: any;
  onEdit: () => void;
  onDelete: () => void;
}

export function ServiceCard({ service, onEdit, onDelete }: ServiceCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="cursor-pointer bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
    >
      {/* Top Section */}
      <div className="flex items-start gap-3">
        {service.imageUrl ? (
          <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100">
            <Image
              src={`/api/files/${service.imageUrl}`}
              alt={service.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}
        <div className="flex flex-col flex-1">
          <h3 className="font-semibold text-gray-800">{service.name}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">
            {service.description || "No description provided"}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Duration: {service.duration} min
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm font-semibold text-gray-800">
          R{service.price}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="text-gray-600 hover:text-gray-900 p-1.5 rounded-md hover:bg-gray-100"
            title="Edit Service"
          >
            <EditIcon size={16} />
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-700 p-1.5 rounded-md hover:bg-red-100"
            title="Delete Service"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
