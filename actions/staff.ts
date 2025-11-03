"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { staffFormSchema } from "@/validations/staff";
import { createStaff, updateStaff, deleteStaff } from "@/services/staff";
import { deleteFileByNameAction } from "./file";
import { IStaff } from "@/definitions/staff";

export async function createStaffAction(
  staffId: string,
  prevState: any,
  formData: FormData
) {
  const validated = staffFormSchema.safeParse(Object.fromEntries(formData));

  if (!validated.success) {
    return {
      message: "Validation failed",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const data = validated.data;

  if (staffId) await updateStaff(staffId, data as Partial<IStaff>);
  else await createStaff(data as Partial<IStaff>);

  revalidatePath("/staff");
  redirect("/dashboard/staff");
}

export async function deleteStaffAction(staffId: string, avatarUrl: string) {
  if (avatarUrl) await deleteFileByNameAction(avatarUrl);
  const result = await deleteStaff(staffId);
  revalidatePath("/dashboard/staff");
  return result;
}
