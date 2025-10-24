"use client";
import { ChevronLeft, ChevronRight, PlusCircle, Scissors } from "lucide-react";
import Link from "next/link";

interface ServiceHeaderProps {
  onAdd: () => void;
}

export function ServiceHeader({ onAdd }: ServiceHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-y-6">
      <div className="flex gap-2 items-center">
        <Scissors />
        <h1 className="text-xl font-semibold">Services</h1>
      </div>{" "}
      <div className="flex flex-col md:flex-row gap-3">
        <button
          onClick={onAdd}
          className="flex items-center justify-center gap-2 bg-gray-900 text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Service</span>
        </button>
        <Link
          href="/categories"
          className="flex items-center justify-center gap-2 text-center px-3 w-full md:w-fit block py-1.5 border border-gray-300 rounded-lg text-gray-700 text-sm hover:bg-gray-50"
        >
          Categories
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}
