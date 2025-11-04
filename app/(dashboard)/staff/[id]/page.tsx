// src/app/(dashboard)/staffs/[id]/page.tsx
import StaffDetailClient from "@/components/(dashboard)/staffs/[id]/client";
import { getStaffById } from "@/services/staff"; // optional real data source

export default async function StaffDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 🔹 Replace this mock lookup with a real DB call:
  const res = await getStaffById(id);

  if (!res.data) {
    return <div className="p-6 text-gray-600">Staff not found.</div>;
  }

  return <StaffDetailClient staff={res.data!} />;
}
