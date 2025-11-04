"use server";

import { connectDB } from "@/lib/db";
import Staff from "@/models/staff";
import { IStaff } from "@/definitions/staff";

/**
 * Fetch all staff members
 */
export async function getStaff(): Promise<{
  success: boolean;
  data?: IStaff[];
}> {
  try {
    await connectDB();

    const staff = await Staff.find().sort({ createdAt: -1 }).lean();

    const data = staff.map((s: any) => ({
      id: s._id.toString(),
      name: s.name,
      email: s.email,
      contactNumber: s.contactNumber,
      role: s.role,
      avatarUrl: s.avatarUrl,
      isActive: s.isActive,
      services: s.services?.map((srv: any) => ({
        id: srv._id.toString(),
        name: srv.name,
      })),
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

/**
 * Fetch a single staff member by ID
 */
export async function getStaffById(
  id: string
): Promise<{ success: boolean; data?: IStaff }> {
  try {
    await connectDB();

    const staff = await Staff.findById(id).lean();

    if (!staff) return { success: false };

    const data = {
      id: staff._id.toString(),
      name: staff.name,
      email: staff.email,
      bio: staff.bio,
      contactNumber: staff.contactNumber,
      role: staff.role,
      avatarUrl: staff.avatarUrl,
      isActive: staff.isActive,
      services: staff.services?.map((srv: any) => ({
        id: srv._id.toString(),
        name: srv.name,
      })),
      workingHours: staff.workingHours || [],
      createdAt: staff.createdAt,
      updatedAt: staff.updatedAt,
    };

    return { success: true, data: JSON.parse(JSON.stringify(data)) };
  } catch (error) {
    console.error("Error fetching staff by ID:", error);
    return { success: false };
  }
}

/**
 * Create a new staff member
 */
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

/**
 * Update existing staff member
 */
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

/**
 * Delete staff member
 */
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
