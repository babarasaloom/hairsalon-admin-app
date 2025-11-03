"use server";

import { connectDB } from "@/lib/db";
import Staff from "@/models/staff";
import { IStaff } from "@/definitions/staff";

export async function getStaff(): Promise<{
  success: boolean;
  data?: IStaff[];
}> {
  try {
    await connectDB();

    const staffList = Staff.find()
      .populate("services", "name") // populate related services
      .sort({ createdAt: -1 })
      .lean();

    const data = (await staffList).map((s: any) => ({
      id: s._id.toString(),
      name: s.name,
      email: s.email,
      contactNumber: s.contactNumber,
      role: s.role,
      description: s.description,
      avatarUrl: s.avatarUrl,
      services: s.services.map((srv: any) => ({
        id: srv._id.toString(),
        name: srv.name,
      })),
      isActive: s.isActive,
      workingHours: s.workingHours || [],
      createdAt: s.createdAt,
      updatedAt: s.updatedAt,
    }));

    return { success: true, data: JSON.parse(JSON.stringify(data)) };
  } catch (error) {
    console.error("Error fetching staff:", error);
    return { success: false };
  }
}

export async function createStaff(data: Partial<IStaff>) {
  try {
    await connectDB();
    const newStaff = await Staff.create(data);
    return { success: true, data: newStaff };
  } catch (error) {
    console.error("Error creating staff:", error);
    return { success: false, message: (error as Error).message };
  }
}

export async function updateStaff(id: string, data: Partial<IStaff>) {
  try {
    await connectDB();
    const updated = await Staff.findByIdAndUpdate(id, data, { new: true });
    return { success: true, data: updated };
  } catch (error) {
    console.error("Error updating staff:", error);
    return { success: false, message: (error as Error).message };
  }
}

export async function deleteStaff(id: string) {
  try {
    await connectDB();
    await Staff.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    console.error("Error deleting staff:", error);
    return { success: false, message: (error as Error).message };
  }
}
