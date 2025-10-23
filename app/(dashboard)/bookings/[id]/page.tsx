"use client";

import { useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Calendar,
  Clock,
  Trash,
  PlusCircle,
  X,
  Search,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

export default function BookingDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [showAddService, setShowAddService] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // Mock booking data
  const [booking, setBooking] = useState({
    client: "Jane Doe",
    phone: "+27 65 123 4567",
    date: "2025-10-25",
    time: "14:00",
    status: "Confirmed",
    services: [
      { id: 1, name: "Women's Haircut", price: 25 },
      { id: 2, name: "Hair Coloring", price: 40 },
    ],
  });

  const allServices = [
    { id: 101, name: "Men's Haircut", category: "haircut", price: 20 },
    { id: 102, name: "Women's Haircut", category: "haircut", price: 25 },
    { id: 103, name: "Beard Trim", category: "grooming", price: 15 },
    { id: 104, name: "Hair Coloring", category: "color", price: 40 },
    { id: 105, name: "Wash & Blow", category: "styling", price: 30 },
    { id: 106, name: "Scalp Massage", category: "spa", price: 35 },
  ];

  const total = booking.services.reduce((acc, s) => acc + s.price, 0);

  const filteredServices = useMemo(() => {
    return allServices.filter(
      (s) =>
        (category === "all" || s.category === category) &&
        s.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, category]);

  const handleRemoveService = (id: number) => {
    setBooking({
      ...booking,
      services: booking.services.filter((s) => s.id !== id),
    });
  };

  const handleAddService = (service: any) => {
    if (!booking.services.find((s) => s.name === service.name)) {
      setBooking({
        ...booking,
        services: [...booking.services, service],
      });
    }
  };

  return (
    <div className="sm:p-6 max-w-3xl mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-1">
          <Link href="/bookings">
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <h1 className="text-lg font-semibold text-gray-800">
            Booking Details
          </h1>
        </div>
        <button className="text-red-500 hover:text-red-600 flex items-center gap-1 text-sm transition">
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </header>

      {/* Client Info */}
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
        <h2 className="text-lg font-medium mb-3 text-gray-700">
          Client Information
        </h2>
        <p className="text-gray-800 font-medium">{booking.client}</p>
        <p className="text-gray-600 text-sm">{booking.phone}</p>
      </div>

      {/* Booking Info */}
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-4 space-y-3">
        <h2 className="text-lg font-medium text-gray-700">
          Appointment Details
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar size={18} />
            <input
              type="date"
              value={booking.date}
              onChange={(e) => setBooking({ ...booking, date: e.target.value })}
              className="border rounded-md px-2 py-1 text-sm"
            />
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Clock size={18} />
            <input
              type="time"
              value={booking.time}
              onChange={(e) => setBooking({ ...booking, time: e.target.value })}
              className="border rounded-md px-2 py-1 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Status
          </label>
          <select
            value={booking.status}
            onChange={(e) => setBooking({ ...booking, status: e.target.value })}
            className="border rounded-md px-3 py-1.5 text-sm w-full"
          >
            <option>Confirmed</option>
            <option>Pending</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      {/* Services */}
      <div className="bg-white rounded-xl shadow-sm border p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-medium text-gray-700">Services</h2>
          <button
            onClick={() => setShowAddService(true)}
            className="flex items-center gap-1 text-gray-700 hover:text-gray-900 text-sm"
          >
            <PlusCircle size={18} /> Add Service
          </button>
        </div>

        <ul className="divide-y">
          {booking.services.map((service) => (
            <li
              key={service.id}
              className="flex items-center justify-between py-2"
            >
              <div>
                <p className="text-gray-800 font-medium">{service.name}</p>
                <p className="text-gray-500 text-sm">${service.price}</p>
              </div>
              <button
                onClick={() => handleRemoveService(service.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash size={18} />
              </button>
            </li>
          ))}
        </ul>

        <div className="border-t pt-3 mt-3 flex justify-between text-gray-800 font-medium">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>

      {/* Add Service Modal / Drawer */}
      {showAddService && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-end sm:items-center z-50">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:w-[420px] h-[90%] sm:h-auto p-5 shadow-lg animate-slideUp sm:animate-fadeIn flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Add Service
              </h3>
              <button
                onClick={() => setShowAddService(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search + Filter */}
            <div className="flex gap-2 mb-3">
              <div className="relative flex-1">
                <Search
                  className="absolute left-2 top-2.5 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search service..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border w-full pl-8 pr-2 py-2 rounded-md text-sm"
                />
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded-md px-2 py-2 text-sm"
              >
                <option value="all">All</option>
                <option value="haircut">Haircuts</option>
                <option value="grooming">Grooming</option>
                <option value="color">Color</option>
                <option value="styling">Styling</option>
                <option value="spa">Spa</option>
              </select>
            </div>

            {/* Service List */}
            <div className="space-y-3 flex-1 overflow-y-auto">
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleAddService(service)}
                    className="w-full flex justify-between items-center border border-gray-100 rounded-xl p-3 text-left hover:bg-gray-50 transition"
                  >
                    <div>
                      <p className="font-medium text-gray-800 text-sm">
                        {service.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {service.category} • ${service.price}
                      </p>
                    </div>
                    <PlusCircle className="w-4 h-4 text-gray-500" />
                  </button>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center py-6">
                  No services found.
                </p>
              )}
            </div>

            {/* Footer */}
            <button
              onClick={() => setShowAddService(false)}
              className="mb-16 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
