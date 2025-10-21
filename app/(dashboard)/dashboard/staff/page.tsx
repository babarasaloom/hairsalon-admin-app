"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronRight, Plus, Scissors, Users } from "lucide-react";
import StaffList from "@/components/dashboard/staffs/list";
import Link from "next/link";

const mockStaff = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Stylist",
    email: "alice@example.com",
    phone: "+123 456 7890",
    availability: true,
  },
  {
    id: 2,
    name: "Mark Brown",
    role: "Receptionist",
    email: "mark@example.com",
    phone: "+321 654 0987",
    availability: false,
  },
];

export default function StaffPage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-y-6">
        <div className="flex gap-2 items-center">
          <Users />
          <h1 className="text-xl font-semibold">Staff</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <button className="flex items-center justify-center w-full md:w-fit gap-1 px-3 py-1.5 bg-gray-800 text-white rounded-lg hover:bg-gray-900">
            <Plus size={16} />
            Add Staff
          </button>
        </div>
      </div>

      <StaffList staff={mockStaff} />
    </div>
  );
}
