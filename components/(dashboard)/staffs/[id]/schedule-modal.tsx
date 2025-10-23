"use client";

import { X, Clock } from "lucide-react";

const mockSchedule = [
  { day: "Monday", time: "09:00 AM – 5:00 PM" },
  { day: "Tuesday", time: "09:00 AM – 5:00 PM" },
  { day: "Wednesday", time: "Off" },
  { day: "Thursday", time: "09:00 AM – 5:00 PM" },
  { day: "Friday", time: "09:00 AM – 5:00 PM" },
  { day: "Saturday", time: "10:00 AM – 3:00 PM" },
  { day: "Sunday", time: "Off" },
];

export default function StaffScheduleModal({ staff, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-end sm:items-center z-50">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:w-[420px] h-[90%] max-h-[90%] p-5 shadow-lg animate-slideUp sm:animate-fadeIn overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {staff.name}'s Schedule
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Schedule List */}
        <div className="space-y-3">
          {mockSchedule.map((day) => (
            <div
              key={day.day}
              className="flex justify-between items-center border border-gray-100 rounded-xl p-3 hover:bg-gray-50"
            >
              <div className="text-gray-700 font-medium">{day.day}</div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock size={14} />
                <span>{day.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
