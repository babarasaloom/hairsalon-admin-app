// src/app/(dashboard)/staffs/[id]/staff-detail-client.tsx
"use client";

import { useState } from "react";
import StaffHeader from "./header";
import StaffProfileCard from "./profile-card";
import StaffWorkingHours from "./working-hours";
import StaffServices from "./services";
import StaffScheduleSection from "./schedules";
import StaffModal from "../modal";
import StaffAddForm from "../add-form";
import StaffScheduleModal from "./schedule-modal";
import { IStaff } from "@/definitions/staff";

export default function StaffDetailClient({ staff }: { staff: IStaff }) {
  const [active, setActive] = useState(staff.isActive);
  const [showEdit, setShowEdit] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  const handleEditSave = (updatedData: Partial<IStaff>) => {
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

      {/* Edit Modal */}
      <StaffModal isOpen={showEdit} onClose={() => setShowEdit(false)}>
        <StaffAddForm
          staff={staff}
          onClose={() => {
            setShowEdit(false);
          }}
        />
      </StaffModal>

      {/* Schedule Modal */}
      {showSchedule && (
        <StaffScheduleModal
          staff={staff}
          onClose={() => setShowSchedule(false)}
        />
      )}
    </div>
  );
}
