"use client";

import { User, ToggleLeft, ToggleRight } from "lucide-react";

export default function StaffProfileCard({ staff, active, setActive }: any) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 flex flex-col sm:flex-row items-center gap-5">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
        <User size={36} />
      </div>
      <div className="flex-1 text-center sm:text-left">
        <h2 className="text-xl font-semibold text-gray-800">{staff.name}</h2>
        <p className="text-gray-500">{staff.role}</p>

        <div className="mt-2 flex items-center justify-center sm:justify-start gap-2 text-sm">
          {active ? (
            <ToggleRight
              size={18}
              className="text-green-600 cursor-pointer"
              onClick={() => setActive(false)}
            />
          ) : (
            <ToggleLeft
              size={18}
              className="text-gray-400 cursor-pointer"
              onClick={() => setActive(true)}
            />
          )}
          <span className={active ? "text-green-700" : "text-gray-500"}>
            {active ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
    </div>
  );
}
