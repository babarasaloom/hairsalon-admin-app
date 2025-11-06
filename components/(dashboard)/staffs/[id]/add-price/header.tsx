"use client";
import { ArrowLeft, PlusCircle } from "lucide-react";
import Link from "next/link";

interface ServiceHeaderProps {
  onAdd: () => void;
  staffId: string;
}

export function ServiceHeader({ onAdd, staffId }: ServiceHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-y-6">
      <div className="flex items-center gap-2">
        <Link href={`/staff/${staffId}`}>
          <ArrowLeft className="w-5 h-5 text-gray-600 hover:text-gray-800 transition" />
        </Link>
        <h1 className="text-lg font-semibold text-gray-800">Add Price</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        <button
          onClick={onAdd}
          className="flex items-center justify-center gap-2 bg-gray-900 text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>
    </div>
  );
}
