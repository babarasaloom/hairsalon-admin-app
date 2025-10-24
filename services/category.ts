"use server";

import { ICategory } from "@/definitions/category";
import { connectDB } from "@/lib/db";
import Category from "@/models/category";

export async function getCategories() {
  try {
    await connectDB();
    const categories = Category.find().sort({ createdAt: -1 }).lean();
    const data = (await categories).map((cat: any) => ({
      id: cat._id.toString(),
      name: cat.name,
      imageUrl: cat.imageUrl,
      description: cat.description,
      isPublished: cat.isPublished,
    }));

    return { success: true, data: JSON.parse(JSON.stringify(data)) };
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return { success: false, data: [] };
  }
}

export async function createCategoryService(data: Partial<ICategory>) {
  await connectDB();
  const category = await Category.create(data);
  return category;
}

export async function updateCategoryService(
  categoryId: string,
  data: Partial<ICategory>
) {
  await connectDB();
  const updatedCategory = await Category.findByIdAndUpdate(categoryId, data, {
    new: true,
  });
  return updatedCategory;
}

export async function deleteCategoryService(categoryId: string) {
  await connectDB();
  const deleted = await Category.findByIdAndDelete(categoryId);
  return deleted;
}

export async function getCategoryByIdService(categoryId: string) {
  await connectDB();
  return Category.findById(categoryId);
}

export async function getAllCategoriesService() {
  await connectDB();
  return Category.find().sort({ createdAt: -1 });
}
