"use client";

import { useState, useEffect } from "react";
import { ICategory } from "@/definitions/category";

interface ServiceFilterProps {
  categories: ICategory[];
  onFilterChange: (filter: {
    text: string;
    categoryId: string | "all";
  }) => void;
}

export default function ServiceFilter({
  categories,
  onFilterChange,
}: ServiceFilterProps) {
  const [filterText, setFilterText] = useState("");
  const [filterCategory, setFilterCategory] = useState<string | "all">("all");

  useEffect(() => {
    onFilterChange({ text: filterText, categoryId: filterCategory });
  }, [filterText, filterCategory]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
      {/* Search */}
      <input
        type="text"
        placeholder="Search services..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="flex-1 rounded-md border px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
      />

      {/* Category Filter */}
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        className="rounded-md border px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}
