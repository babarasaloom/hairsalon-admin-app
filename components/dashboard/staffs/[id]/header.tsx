"use client";

import { ArrowLeft, Edit, Trash, CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StaffHeader({ onEdit, onSchedule }: any) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between mb-2">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="flex items-center gap-2">
        <button onClick={onEdit} className="p-2 rounded-lg hover:bg-gray-100">
          <Edit size={18} className="text-gray-700" />
        </button>
        <button
          onClick={onSchedule}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <CalendarDays size={18} className="text-gray-700" />
        </button>
        <button className="p-2 rounded-lg hover:bg-red-100">
          <Trash size={18} className="text-red-500" />
        </button>
      </div>
    </div>
  );
}
