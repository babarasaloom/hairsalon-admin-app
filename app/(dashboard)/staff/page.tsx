import { StaffClientPage } from "@/components/(dashboard)/staffs/client";
import { getCategories } from "@/services/category";
import { getStaff } from "@/services/staff";

export const dynamic = "force-dynamic";

export default async function StaffPage() {
  const result = await getStaff();
  const res = await getCategories();

  return (
    <StaffClientPage
      initialStaff={result.data || []}
      categories={res.data || []}
    />
  );
}
