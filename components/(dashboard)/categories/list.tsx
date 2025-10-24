"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CategoryCard } from "./card";
import { ICategory } from "@/definitions/category";

interface CategoryListProps {
  categories: ICategory[];
  onEdit: (category: ICategory) => void;
  onDelete: (category: ICategory) => void;
}

export function CategoryList({
  categories,
  onEdit,
  onDelete,
}: CategoryListProps) {
  if (categories.length === 0)
    return (
      <p className="text-gray-500">No categories yet. Add your first one!</p>
    );

  return (
    <motion.div
      layout
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <AnimatePresence>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onEdit={() => onEdit(category)}
            onDelete={() => onDelete(category)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
