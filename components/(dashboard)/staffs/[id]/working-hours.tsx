import { Clock } from "lucide-react";

export default function StaffWorkingHours({ workingHours }: any) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <h3 className="font-medium text-gray-800 mb-2">Working Hours</h3>
      <div className="flex items-center gap-2 text-gray-600 text-sm">
        <Clock size={16} />
        {workingHours}
      </div>
    </div>
  );
}
