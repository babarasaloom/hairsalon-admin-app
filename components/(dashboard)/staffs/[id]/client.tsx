"use client";

import { useState } from "react";
import StaffHeader from "./header";
import StaffProfileCard from "./profile-card";
// import StaffWorkingHours from "./working-hours";
// import StaffServices from "./services";
import StaffScheduleSection from "./schedules";
import StaffModal from "../modal";
import StaffAddForm from "../add-form";
import StaffScheduleModal from "./schedule-modal";
import { IStaff } from "@/definitions/staff";

// NEW IMPORT
import ArtistPricingManager from "./artist-prices";

export default function StaffDetailClient({ staff }: { staff: IStaff }) {
  const [active, setActive] = useState(staff.isActive);
  const [showEdit, setShowEdit] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <StaffHeader
        onEdit={() => setShowEdit(true)}
        onSchedule={() => setShowSchedule(true)}
        staffId={staff.id!}
      />

      {/* Profile Card */}
      <StaffProfileCard staff={staff} active={active} setActive={setActive} />

      {/* Sections */}
      <div className="grid gap-4">
        {/* <StaffWorkingHours workingHours={staff.workingHours} /> */}
        {/* <StaffServices services={staff.services} /> */}

        {/* NEW: Staff Pricing Manager */}
        <div className="md:border md:rounded-2xl md:p-4">
          <ArtistPricingManager staffId={staff.id!} />
        </div>

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
