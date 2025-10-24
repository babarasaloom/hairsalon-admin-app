"use client";

import { Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export const CategoryHeader = ({ onAdd }: { onAdd: () => void }) => {
  return (
    <motion.div
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-2">
        <Link href="/services">
          <ArrowLeft className="w-5 h-5 text-gray-600 hover:text-gray-800 transition" />
        </Link>
        <h1 className="text-lg font-semibold text-gray-800">
          Service Categories
        </h1>
      </div>

      <motion.button
        onClick={onAdd}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center justify-center gap-1.5 px-4 py-2 bg-gray-800 text-white rounded-xl shadow-sm hover:bg-gray-900 transition"
      >
        <Plus size={16} />
        Add Category
      </motion.button>
    </motion.div>
  );
};
