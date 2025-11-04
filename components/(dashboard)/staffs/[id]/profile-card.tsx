"use client";

import {
  Mail,
  Phone,
  User,
  FileText,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { IStaff } from "@/definitions/staff";

export default function StaffProfileCard({
  staff,
  active,
  setActive,
}: {
  staff: IStaff;
  active: boolean;
  setActive: (active: boolean) => void;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col sm:flex-row items-center gap-6">
      <div className="relative">
        <Avatar className="w-24 h-24 border-2 border-gray-100">
          {staff.avatarUrl ? (
            <AvatarImage
              src={`/api/files/${staff.avatarUrl}`}
              alt={staff.name}
              className="object-cover"
            />
          ) : (
            <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-50 text-blue-700">
              <User size={40} />
            </AvatarFallback>
          )}
        </Avatar>
        <div
          className={cn(
            "absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white",
            active ? "bg-green-500" : "bg-gray-300"
          )}
        ></div>
      </div>

      <div className="flex-1 text-center sm:text-left space-y-2">
        <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
          {staff.name}
        </h2>
        <p className="text-gray-600 font-medium">{staff.role}</p>

        {staff.email && (
          <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-500">
            <Mail size={14} className="text-gray-400" />
            <span>{staff.email}</span>
          </div>
        )}

        {staff.contactNumber && (
          <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-500">
            <Phone size={14} className="text-gray-400" />
            <span>{staff.contactNumber}</span>
          </div>
        )}

        {staff.bio && (
          <div className="flex items-start justify-center sm:justify-start gap-2 text-sm text-gray-500">
            <FileText size={14} className="text-gray-400 mt-1" />
            <p className="flex-1">{staff.bio}</p>
          </div>
        )}

        <div className="mt-3 flex items-center justify-center sm:justify-start gap-2">
          <button
            onClick={() => setActive(!active)}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
              active ? "bg-green-500" : "bg-gray-200"
            )}
          >
            <span
              className={cn(
                "inline-block h-5 w-5 rounded-full bg-white shadow-lg transform transition-transform",
                active ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
          <span
            className={cn(
              "font-medium text-sm",
              active ? "text-green-600" : "text-gray-500"
            )}
          >
            {active ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
    </div>
  );
}
