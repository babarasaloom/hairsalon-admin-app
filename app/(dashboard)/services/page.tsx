import { ServiceClientPage } from "@/components/(dashboard)/services/client";
import { getServices } from "@/services/service";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const result = await getServices();

  return <ServiceClientPage initialServices={result.data || []} />;
}
