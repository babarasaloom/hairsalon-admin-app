"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { IStaff } from "@/definitions/staff";

interface StaffCardProps {
  staff: IStaff;
}

export function StaffCard({ staff }: StaffCardProps) {
  return (
    <Link href={`/staff/${staff.id}`}>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
      >
        {/* Top Section */}
        <div className="flex items-start gap-3">
          {staff.avatarUrl ? (
            <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100">
              <Image
                src={`/api/files/${staff.avatarUrl}`}
                alt={staff.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
              No Image
            </div>
          )}

          <div className="flex flex-col flex-1">
            <h3 className="font-semibold text-gray-800">{staff.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{staff.role}</p>

            {staff.email && (
              <p className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                <Mail size={12} /> {staff.email}
              </p>
            )}
            {staff.contactNumber && (
              <p className="flex items-center gap-1 text-xs text-gray-500">
                <Phone size={12} /> {staff.contactNumber}
              </p>
            )}
          </div>
        </div>

        {/* Services */}
        {staff.services && staff.services.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-gray-400 mb-1">Services:</p>
            <div className="flex flex-wrap gap-1">
              {staff.services.map((srv: any) => (
                <span
                  key={srv.id || srv}
                  className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full"
                >
                  {srv.name || srv}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Section */}
        <div className="flex justify-between items-center mt-4">
          <span
            className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
              staff.isActive
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {staff.isActive ? "Active" : "Inactive"}
          </span>
          <span className="text-xs text-gray-400 italic">View details →</span>
        </div>
      </motion.div>
    </Link>
  );
}
