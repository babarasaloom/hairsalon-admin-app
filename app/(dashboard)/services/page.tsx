import { ServiceClientPage } from "@/components/(dashboard)/services/client";
import { ICategory } from "@/definitions/category";
import { getCategories } from "@/services/category";
import { getServices } from "@/services/service";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const result = await getServices();
  const res = await getCategories();

  return (
    <ServiceClientPage
      initialServices={result.data || []}
      categories={
        res.data?.map((cat: ICategory) => ({ id: cat.id!, name: cat.name })) ||
        []
      }
    />
  );
}
