"use client";

import { useState } from "react";
import { Calendar, Clock, Scissors, Plus } from "lucide-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import BookingModal from "@/components/dashboard/bookings/modal";

interface Booking {
  id: number;
  client: string;
  service: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  price: string;
}

const initialBookings: Booking[] = [
  {
    id: 1,
    client: "John Doe",
    service: "Men's Haircut",
    date: "2025-10-20",
    time: "10:00 AM",
    status: "upcoming",
    price: "$25",
  },
  {
    id: 2,
    client: "Sarah Smith",
    service: "Hair Coloring",
    date: "2025-10-17",
    time: "1:30 PM",
    status: "completed",
    price: "$60",
  },
];

export default function BookingsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<
    "All" | "upcoming" | "completed" | "cancelled"
  >("All");
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | undefined>(
    undefined
  );

  const filtered =
    filter === "All" ? bookings : bookings.filter((b) => b.status === filter);

  const handleSave = (data: any) => {
    if (editingBooking) {
      setBookings((prev) =>
        prev.map((b) => (b.id === editingBooking.id ? { ...b, ...data } : b))
      );
      setEditingBooking(undefined);
    } else {
      const newBooking = {
        id: Date.now(),
        status: "upcoming" as const,
        ...data,
      };
      setBookings((prev) => [newBooking, ...prev]);
    }
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-y-6">
        <div className="flex gap-2 items-center">
          <Calendar />
          <h1 className="text-xl font-semibold">Bookings</h1>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center justify-center gap-1 px-3 py-1.5 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
        >
          <Plus size={16} />
          Add Booking
        </button>
      </div>

      {/* Filters */}
      <div className="md:space-y-2 space-x-2 pb-2 mb-2 scrollbar-hide">
        {["All", "upcoming", "completed", "cancelled"].map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key as any)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full border text-sm transition ${
              filter === key
                ? "bg-gray-800 text-white border-gray-800"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Booking List */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-12">
            No {filter !== "All" ? filter : ""} bookings found.
          </div>
        ) : (
          filtered.map((b) => (
            <div
              key={b.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => router.push(`/dashboard/bookings/${b.id}`)}
            >
              {/* Client + Service */}
              <div className="flex-1">
                <div className="text-base font-medium text-gray-800">
                  {b.client}
                </div>

                {/* Date & Time */}
                <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {b.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {b.time}
                  </span>
                </div>
              </div>

              {/* Price + Status */}
              <div className="mt-4 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-gray-700 font-semibold">{b.price}</div>
                  <div
                    className={clsx(
                      "text-xs font-medium rounded-full px-2 py-0.5 inline-block",
                      b.status === "upcoming" && "bg-blue-100 text-blue-700",
                      b.status === "completed" && "bg-green-100 text-green-700",
                      b.status === "cancelled" && "bg-red-100 text-red-700"
                    )}
                  >
                    {b.status}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingBooking(undefined);
        }}
        onSubmit={handleSave}
        booking={editingBooking}
      />
    </div>
  );
}
