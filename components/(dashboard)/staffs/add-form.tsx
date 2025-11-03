"use client";

import { deleteFileByNameAction, uploadFile } from "@/actions/file";
import { useActionState, startTransition, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { staffFormSchema } from "@/validations/staff";
import { IStaff } from "@/definitions/staff";
import { motion } from "framer-motion";
import InputValidated from "@/components/ui/input-validated";
import Textarea from "@/components/ui/textarea-validated";
import { createStaffAction } from "@/actions/staff";
import SelectValidated from "@/components/ui/select-validated";
import {
  STAFF_ROLES,
  STAFF_STATUS,
  staffInputFormData,
} from "@/constants/staff";

export default function StaffAddForm({
  staff,
  onClose,
}: {
  staff: IStaff | null;
  onClose: () => void;
}) {
  const staffId = staff?.id || "";
  const formRef = useRef<HTMLFormElement>(null);
  const initialState = { message: "", errors: {} };

  const createStaffActionWithId = createStaffAction.bind(null, staffId);
  const [state, formAction, isPending] = useActionState(
    createStaffActionWithId,
    initialState
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      name: staff?.name || "",
      role: staff?.role || "",
      contactNumber: staff?.contactNumber || "",
      email: staff?.email || "",
      bio: staff?.bio || "",
      avatarUrl: staff?.avatarUrl || "",
      isActive: staff?.isActive ?? true,
    },
  });

  const onSubmit = handleSubmit(async () => {
    const formData = new FormData(formRef.current!);

    // File upload
    const fileInput = document.querySelector<HTMLInputElement>(
      'input[name="imageFile"]'
    );
    let filename = "";

    if (fileInput?.files?.[0]) {
      const uploadData = new FormData();
      uploadData.append("file", fileInput.files[0]);
      const res = await uploadFile(uploadData);
      if (res.success) filename = res.filename || "";
    }

    if (filename) {
      if (staff?.avatarUrl) await deleteFileByNameAction(staff.avatarUrl);
      formData.append("avatarUrl", filename);
    } else if (staff?.avatarUrl) {
      formData.append("avatarUrl", staff.avatarUrl);
    }

    startTransition(() => {
      formAction(formData);
      onClose();
    });
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 80 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl w-full sm:w-[420px] p-6 shadow-lg"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {staffId ? "Edit Staff" : "Add Staff"}
      </h2>

      <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-4">
        {staffInputFormData.map((i) => (
          <InputValidated
            key={i.name}
            {...i}
            register={register}
            errors={errors}
            isPending={isPending}
            stateError={state?.errors}
          />
        ))}

        {/* Role */}
        <SelectValidated
          label="Role"
          name="role"
          register={register}
          errors={errors}
          options={STAFF_ROLES.map((role) => ({
            _id: role.value,
            name: role.label,
          }))}
        />

        <Textarea
          label="Bio / About"
          name="bio"
          register={register}
          errors={errors}
        />

        {/* Status */}
        <SelectValidated
          label="Status"
          name="isActive"
          register={register}
          errors={errors}
          options={STAFF_STATUS.map((status) => ({
            _id: status.value,
            name: status.label,
          }))}
        />

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Upload Image
          </label>
          {staff?.avatarUrl && (
            <img
              src={`/api/files/${staff.avatarUrl}`}
              alt={staff.name}
              className="w-20 h-20 rounded border mb-1 object-cover"
            />
          )}
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            className="w-full rounded-md border px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition"
        >
          {staffId ? "Update Staff" : "Add Staff"}
        </button>
      </form>
    </motion.div>
  );
}
