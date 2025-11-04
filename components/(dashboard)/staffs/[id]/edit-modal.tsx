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
import { X } from "lucide-react";

export default function StaffEditModal({
  staff,
  onClose,
  onSave,
}: {
  staff: IStaff;
  onClose: () => void;
  onSave: (data: IStaff) => void;
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
      // workingHours: staff?.workingHours || "",
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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-end sm:items-center z-50">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 80 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:w-[420px] h-[90%] sm:h-auto p-6 overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Edit Staff</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

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

          {/* Working Hours */}
          <InputValidated
            label="Working Hours"
            name="workingHours"
            register={register}
            errors={errors}
            isPending={isPending}
            stateError={state?.errors}
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

          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition"
            >
              Update Staff
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
