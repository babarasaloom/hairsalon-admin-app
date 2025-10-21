"use client";

import { useState } from "react";
import { Folder, Edit, Plus, X, ArrowLeft } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  description?: string;
  active: boolean;
}

const mockCategories: Category[] = [
  {
    id: 1,
    name: "Haircuts",
    description: "Men & Women haircuts",
    active: true,
  },
  { id: 2, name: "Coloring", description: "All color services", active: true },
  {
    id: 3,
    name: "Styling",
    description: "Blow-dry, curls, and updos",
    active: false,
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleAdd = () => {
    setEditingCategory(null);
    setShowModal(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleSave = (newCategory: Category) => {
    if (editingCategory) {
      // Update existing
      setCategories((prev) =>
        prev.map((c) => (c.id === newCategory.id ? newCategory : c))
      );
    } else {
      // Add new
      setCategories((prev) => [
        ...prev,
        { ...newCategory, id: prev.length + 1 },
      ]);
    }
    setShowModal(false);
  };

  const toggleActive = (id: number) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <div className="flex items-center gap-1">
          <Link href="/dashboard/services">
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <h1 className="text-lg font-semibold text-gray-800">
            Service Categories
          </h1>
        </div>{" "}
        <button
          onClick={handleAdd}
          className="flex items-center justify-center gap-1 px-3 py-1.5 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>
      {/* Categories Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div
            key={c.id}
            className={clsx(
              "bg-white border border-gray-200 rounded-2xl shadow-sm p-4 hover:shadow-md transition-all duration-200",
              !c.active && "opacity-70"
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Folder size={18} className="text-gray-600" />
                <div>
                  <div className="font-medium text-gray-800">{c.name}</div>
                  {c.description && (
                    <div className="text-xs text-gray-500">{c.description}</div>
                  )}
                </div>
              </div>
              <button
                onClick={() => toggleActive(c.id)}
                className={clsx(
                  "text-xs font-medium px-2 py-1 rounded-full",
                  c.active
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                )}
              >
                {c.active ? "Active" : "Inactive"}
              </button>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                onClick={() => handleEdit(c)}
                className="text-gray-500 hover:text-blue-600 transition"
              >
                <Edit size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <CategoryModal
          category={editingCategory}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

/* ----------------------------
   Category Modal Component
----------------------------- */
function CategoryModal({
  category,
  onClose,
  onSave,
}: {
  category: Category | null;
  onClose: () => void;
  onSave: (data: Category) => void;
}) {
  const [name, setName] = useState(category?.name || "");
  const [description, setDescription] = useState(category?.description || "");
  const [active, setActive] = useState(category?.active ?? true);

  const handleSubmit = () => {
    if (!name.trim()) return;
    const updated = {
      id: category?.id || Date.now(),
      name,
      description,
      active,
    };
    onSave(updated);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-end sm:items-center z-50">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:w-[420px] h-[80%] sm:h-auto p-5 shadow-lg animate-slideUp sm:animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {category ? "Edit Category" : "Add Category"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-300 focus:outline-none"
              placeholder="e.g. Haircuts"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-300 focus:outline-none"
              placeholder="Short description..."
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Active</label>
            <button
              onClick={() => setActive(!active)}
              className={clsx(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                active
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              )}
            >
              {active ? "Active" : "Inactive"}
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-900 transition"
          >
            {category ? "Save Changes" : "Add Category"}
          </button>
        </div>
      </div>
    </div>
  );
}
