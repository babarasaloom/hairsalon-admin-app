"use client";

import { motion } from "framer-motion";
import { ICategory } from "@/definitions/category";
import CategoryModal from "./category-modal";

interface CategoryDeleteModalProps {
  confirmDelete: ICategory | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export function CategoryDeleteModal({
  confirmDelete,
  onCancel,
  onConfirm,
}: CategoryDeleteModalProps) {
  if (!confirmDelete) return null;

  return (
    <CategoryModal isOpen={!!confirmDelete} onClose={onCancel}>
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl p-6 w-[90%] max-w-sm text-center"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Delete ICategory
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{confirmDelete?.name}</span>?
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </CategoryModal>
  );
}
