"use client";

import { IStaff } from "@/definitions/staff";
import { StaffCard } from "./card";

interface Props {
  initialStaff: IStaff[];
  onEdit: (staff: IStaff) => void;
  onDelete: (staff: IStaff) => void;
}

export function StaffList({ initialStaff, onEdit, onDelete }: Props) {
  if (!initialStaff.length) {
    return <p className="text-gray-500 text-center py-6">No staff found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {initialStaff.map((staff) => (
        <StaffCard key={staff.id} staff={staff} />
      ))}
    </div>
  );
}
