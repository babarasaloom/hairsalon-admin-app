"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Phone, Mail, Calendar, Scissors } from "lucide-react";

const mockClientData = {
  id: 1,
  name: "John Doe",
  phone: "+27 62 555 1234",
  email: "john@example.com",
  totalBookings: 5,
  lastBooking: "2025-10-17",
  bookings: [
    {
      id: 1,
      service: "Men's Haircut",
      date: "2025-10-17",
      time: "10:00 AM",
      price: "$25",
      status: "completed",
    },
    {
      id: 2,
      service: "Beard Trim",
      date: "2025-09-28",
      time: "2:30 PM",
      price: "$15",
      status: "completed",
    },
    {
      id: 3,
      service: "Hair Coloring",
      date: "2025-09-10",
      time: "12:00 PM",
      price: "$60",
      status: "cancelled",
    },
  ],
};

export default function ClientDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const client = mockClientData; // Normally fetched from DB

  return (
    <div className="pb-10">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Client Info */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm mb-5">
        <h2 className="text-xl font-semibold text-gray-800">{client.name}</h2>
        <div className="mt-2 text-gray-600 space-y-1 text-sm">
          <div className="flex items-center gap-2">
            <Phone size={14} />
            {client.phone}
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} />
            {client.email}
          </div>
          <div className="flex items-center gap-2 text-gray-500 mt-2">
            <Calendar size={14} />
            Last booking: {client.lastBooking}
          </div>
        </div>

        <div className="mt-4 flex gap-4 text-sm text-gray-700">
          <div>
            <span className="font-semibold text-gray-800">
              {client.totalBookings}
            </span>{" "}
            total bookings
          </div>
        </div>
      </div>

      {/* Booking History */}
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Booking History
      </h3>

      <div className="space-y-3">
        {client.bookings.map((b) => (
          <div
            key={b.id}
            className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center hover:shadow-md transition"
          >
            <div>
              <div className="font-medium text-gray-800 flex items-center gap-2">
                <Scissors size={16} className="text-gray-500" />
                {b.service}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {b.date} • {b.time}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Status:{" "}
                <span
                  className={`font-medium ${
                    b.status === "completed"
                      ? "text-green-600"
                      : b.status === "cancelled"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  {b.status}
                </span>
              </div>
            </div>
            <div className="text-gray-800 font-semibold">{b.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
