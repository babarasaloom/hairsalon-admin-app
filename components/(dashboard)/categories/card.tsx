"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Edit3, Trash2, ImageOff } from "lucide-react";
import { ICategory } from "@/definitions/category";

interface CategoryCardProps {
  category: ICategory;
  onEdit: () => void;
  onDelete: () => void;
}

export function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col justify-between bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all h-full min-h-[160px]"
    >
      {/* --- Top Section --- */}
      <div className="flex items-start gap-3">
        <div className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
          {category.imageUrl ? (
            <Image
              src={`/api/files/${category.imageUrl}`}
              alt={category.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <ImageOff size={20} />
            </div>
          )}
        </div>

        <div className="flex flex-col min-w-0">
          <h3 className="font-semibold text-gray-800 text-base truncate">
            {category.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2">
            {category.description || "No description"}
          </p>
        </div>
      </div>

      {/* --- Bottom Section --- */}
      <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-100">
        <span
          className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
            category.isPublished
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {category.isPublished ? "Published" : "Unpublished"}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="text-gray-600 hover:text-gray-900 p-1.5 rounded-md hover:bg-gray-100 transition"
            title="Edit category"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 p-1.5 rounded-md hover:bg-red-50 transition"
            title="Delete category"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
