"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Edit3, Trash2 } from "lucide-react";
import { IService } from "@/definitions/service";

interface ServiceCardProps {
  service: IService;
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
      className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md flex flex-col justify-between transition-all"
    >
      {/* Top: Image + Details */}
      <div className="flex items-start gap-3 mb-4">
        {service.imageUrl && (
          <Image
            src={`/api/files/${service.imageUrl}`}
            alt={service.name}
            width={60}
            height={60}
            className="rounded-md border object-cover"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-1">
            {service.name}
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm line-clamp-2">
            {service.description || "No description"}
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Duration: {service.duration} min
          </p>
        </div>
      </div>

      {/* Bottom: Status + Actions */}
      <div className="flex justify-between items-center mt-auto">
        <span
          className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
            service.isActive
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {service.isActive ? "Active" : "Inactive"}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="text-gray-600 hover:text-gray-900 p-1.5 rounded-md hover:bg-gray-100"
            title="Edit service"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 p-1.5 rounded-md hover:bg-red-50"
            title="Delete service"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
