"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import StaffHeader from "@/components/(dashboard)/staffs/[id]/header";
import StaffProfileCard from "@/components/(dashboard)/staffs/[id]/profile-card";
import StaffWorkingHours from "@/components/(dashboard)/staffs/[id]/working-hours";
import StaffServices from "@/components/(dashboard)/staffs/[id]/services";
import StaffScheduleSection from "@/components/(dashboard)/staffs/[id]/schedules";
import StaffEditModal from "@/components/(dashboard)/staffs/[id]/edit-modal";
import StaffScheduleModal from "@/components/(dashboard)/staffs/[id]/schedule-modal";

interface Staff {
  id: number;
  name: string;
  role: string;
  services: string[];
  workingHours: string;
  active: boolean;
}

const mockStaff: Staff[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Stylist",
    services: ["Haircuts", "Styling"],
    workingHours: "09:00 AM – 5:00 PM",
    active: true,
  },
  {
    id: 2,
    name: "Maria Lopez",
    role: "Receptionist",
    services: ["Scheduling"],
    workingHours: "10:00 AM – 6:00 PM",
    active: true,
  },
];

export default function StaffDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const staff = mockStaff.find((s) => s.id === Number(id));
  const [active, setActive] = useState(staff?.active ?? false);
  const [showEdit, setShowEdit] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  if (!staff) return <div className="p-6 text-gray-600">Staff not found.</div>;

  const handleEditSave = (updatedData: any) => {
    console.log("Updated staff data:", updatedData);
    setShowEdit(false);
  };

  return (
    <div className="space-y-6">
      <StaffHeader
        onEdit={() => setShowEdit(true)}
        onSchedule={() => setShowSchedule(true)}
      />
      <StaffProfileCard staff={staff} active={active} setActive={setActive} />
      <div className="grid gap-4">
        <StaffWorkingHours workingHours={staff.workingHours} />
        <StaffServices services={staff.services} />
        <StaffScheduleSection
          name={staff.name}
          onView={() => setShowSchedule(true)}
        />
      </div>

      {/* Modals */}
      {showEdit && (
        <StaffEditModal
          staff={staff}
          onClose={() => setShowEdit(false)}
          onSave={handleEditSave}
        />
      )}
      {showSchedule && (
        <StaffScheduleModal
          staff={staff}
          onClose={() => setShowSchedule(false)}
        />
      )}
    </div>
  );
}
