"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { serviceFormSchema } from "@/validations/service";
import {
  createService,
  updateService,
  deleteService,
} from "@/services/service";
import { deleteFileByNameAction } from "./file";

export async function createServiceAction(
  serviceId: string,
  prevState: any,
  formData: FormData
) {
  const validated = serviceFormSchema.safeParse(Object.fromEntries(formData));

  if (!validated.success) {
    return {
      message: "Validation failed",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const data = validated.data;

  if (serviceId) await updateService(serviceId, data);
  else await createService(data);

  revalidatePath("/services");
  redirect("/services");
}

export async function deleteServiceAction(serviceId: string, imageUrl: string) {
  if (imageUrl) await deleteFileByNameAction(imageUrl);
  const result = await deleteService(serviceId);
  revalidatePath("/dashboard/services");
  return result;
}
