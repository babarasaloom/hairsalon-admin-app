import { ServiceClientPage } from "@/components/(dashboard)/staffs/[id]/add-price/client";
import { ICategory } from "@/definitions/category";
import { getServicesWithoutPrice } from "@/services/artist-price";
import { getCategories } from "@/services/category";

export const dynamic = "force-dynamic";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: staffId } = await params;
  const result = await getServicesWithoutPrice(staffId);
  const res = await getCategories();

  return (
    <ServiceClientPage
      initialServices={result.data || []}
      categories={
        res.data?.map((cat: ICategory) => ({ id: cat.id!, name: cat.name })) ||
        []
      }
      staffId={staffId}
    />
  );
}
