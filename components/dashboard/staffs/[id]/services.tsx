import { Scissors } from "lucide-react";

export default function StaffServices({ services }: any) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <h3 className="font-medium text-gray-800 mb-2">Assigned Services</h3>
      <div className="flex items-center gap-2 text-gray-600 text-sm">
        <Scissors size={16} />
        <span>{services.join(", ")}</span>
      </div>
    </div>
  );
}
