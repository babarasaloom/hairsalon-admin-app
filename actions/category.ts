// actions/category.actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { categoryFormSchema } from "@/validations/category";
import { deleteFileByNameAction } from "./file";
import {
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
} from "@/services/category";

export async function createCategoryAction(
  categoryId: string,
  prevState: any,
  formData: FormData
) {
  try {
    const validated = categoryFormSchema.safeParse(
      Object.fromEntries(formData)
    );

    if (!validated.success) {
      return {
        message: "Validation failed",
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const { name, description, imageUrl, isPublished } = validated.data;

    if (categoryId) {
      await updateCategoryService(categoryId, {
        name,
        description,
        imageUrl,
        isPublished,
      });
    } else {
      await createCategoryService({
        name,
        description,
        imageUrl,
        isPublished,
      });
    }
  } catch (error: any) {
    console.error("❌ createCategoryAction error:", error);
    return {
      message: "Failed to create or update category",
      errors: { global: error.message },
    };
  }
  revalidatePath("/categories");
  redirect("/categories");
}

export async function deleteCategoryAction(
  categoryId: string,
  imageUrl: string
) {
  try {
    // delete image file if exists
    if (imageUrl) await deleteFileByNameAction(imageUrl);

    await deleteCategoryService(categoryId);
    revalidatePath("/categories");

    return { success: true, message: "Category deleted successfully." };
  } catch (error: any) {
    console.error("❌ deleteCategoryAction error:", error);
    return { success: false, message: "Failed to delete category." };
  }
}
