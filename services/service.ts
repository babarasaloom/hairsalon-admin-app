"use server";

import { connectDB } from "@/lib/db";
import Service from "@/models/service";
import { IService } from "@/definitions/service";

export async function getServices(): Promise<{
  success: boolean;
  data?: IService[];
}> {
  try {
    await connectDB();
    // const services = await Service.find().populate("categoryId", "name").lean();
    const services = Service.find()
      .populate("categoryId", "name")
      .sort({ createdAt: -1 })
      .lean();
    const data = (await services).map((s: any) => ({
      id: s._id.toString(),
      name: s.name,
      imageUrl: s.imageUrl,
      description: s.description,
      duration: s.duration,
      isActive: s.isActive,
    }));

    return { success: true, data: JSON.parse(JSON.stringify(data)) };
  } catch (error) {
    console.error("Error fetching services:", error);
    return { success: false };
  }
}

export async function createService(data: Partial<IService>) {
  try {
    await connectDB();
    const newService = await Service.create(data);
    return { success: true, data: newService };
  } catch (error) {
    console.error("Error creating service:", error);
    return { success: false, message: (error as Error).message };
  }
}

export async function updateService(id: string, data: Partial<IService>) {
  try {
    await connectDB();
    const updated = await Service.findByIdAndUpdate(id, data, { new: true });
    return { success: true, data: updated };
  } catch (error) {
    console.error("Error updating service:", error);
    return { success: false, message: (error as Error).message };
  }
}

export async function deleteService(id: string) {
  try {
    await connectDB();
    await Service.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    console.error("Error deleting service:", error);
    return { success: false, message: (error as Error).message };
  }
}
