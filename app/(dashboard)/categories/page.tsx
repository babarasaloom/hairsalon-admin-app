"use client";

import { useState, useEffect } from "react";
import { getCategories } from "@/services/category";
import { CategoryHeader } from "@/components/(dashboard)/categories/header";
import { CategoryList } from "@/components/(dashboard)/categories/list";
import CategoryModal from "@/components/(dashboard)/categories/category-modal";
import { CategoryDeleteModal } from "@/components/(dashboard)/categories/delete-modal";
import CategoryAddForm from "@/components/(dashboard)/categories/add-form";
import { deleteCategoryAction } from "@/actions/category";
import { ICategory } from "@/definitions/category";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null
  );
  const [confirmDelete, setConfirmDelete] = useState<ICategory | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const res = await getCategories();
    if (res.success) setCategories(res.data);
  }

  const handleAdd = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category: ICategory) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    const res = await deleteCategoryAction(
      confirmDelete.id || "",
      confirmDelete.imageUrl || ""
    );
    if (res.success) {
      setConfirmDelete(null);
      await fetchCategories();
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="space-y-6">
      <CategoryHeader onAdd={handleAdd} />

      <CategoryList
        categories={categories}
        onEdit={handleEdit}
        onDelete={(cat) => setConfirmDelete(cat)}
      />

      {/* Add/Edit Modal */}
      <CategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CategoryAddForm
          category={editingCategory}
          onClose={() => {
            setIsModalOpen(false);
            fetchCategories();
          }}
        />
      </CategoryModal>

      {/* Delete Modal */}
      <CategoryDeleteModal
        confirmDelete={confirmDelete}
        onCancel={() => setConfirmDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
