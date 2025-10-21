"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";

interface Booking {
  id?: number;
  client: string;
  service: string;
  date: string;
  time: string;
  price: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (booking: Booking) => void;
  booking?: Booking;
}

const servicesList = [
  "Men's Haircut",
  "Hair Coloring",
  "Wash & Blow Dry",
  "Styling",
];

export default function BookingModal({
  isOpen,
  onClose,
  onSubmit,
  booking,
}: BookingModalProps) {
  const [form, setForm] = useState<Booking>({
    client: "",
    service: "",
    date: "",
    time: "",
    price: "",
  });

  useEffect(() => {
    if (booking) setForm(booking);
    else
      setForm({
        client: "",
        service: "",
        date: "",
        time: "",
        price: "",
      });
  }, [booking]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {booking ? "Edit Booking" : "Add Booking"}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
            onClose();
          }}
          className="flex flex-col gap-3"
        >
          <input
            type="text"
            placeholder="Client Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            value={form.client}
            onChange={(e) => setForm({ ...form, client: e.target.value })}
            required
          />

          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            required
          >
            <option value="">Select Service</option>
            {servicesList.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />

          <input
            type="time"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Price"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
            >
              {booking ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
