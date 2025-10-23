"use client";

import { X } from "lucide-react";
import { useState } from "react";

export default function StaffEditModal({ staff, onClose, onSave }: any) {
  const [formData, setFormData] = useState(staff);

  const handleChange = (key: string, value: string | string[]) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-end sm:items-center z-50">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:w-[420px] h-[90%] sm:h-auto p-5 shadow-lg animate-slideUp sm:animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Edit Staff</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Role</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => handleChange("role", e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Working Hours</label>
            <input
              type="text"
              value={formData.workingHours}
              onChange={(e) => handleChange("workingHours", e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Services</label>
            <input
              type="text"
              value={formData.services.join(", ")}
              onChange={(e) =>
                handleChange(
                  "services",
                  e.target.value.split(",").map((s) => s.trim())
                )
              }
              className="w-full border border-gray-200 rounded-lg p-2 text-sm"
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-3 py-1.5 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-900"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
