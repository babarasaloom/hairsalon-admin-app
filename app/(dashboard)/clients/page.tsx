"use client";

import { useState, useMemo } from "react";
import { User, Phone, Mail, Calendar, Plus, Search, Users } from "lucide-react";
import { useRouter } from "next/navigation";

interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  totalBookings: number;
  lastBooking: string;
}

const mockClients: Client[] = [
  {
    id: 1,
    name: "John Doe",
    phone: "+27 62 555 1234",
    email: "john@example.com",
    totalBookings: 5,
    lastBooking: "2025-10-17",
  },
  {
    id: 2,
    name: "Sarah Smith",
    phone: "+27 71 987 6543",
    email: "sarah@example.com",
    totalBookings: 2,
    lastBooking: "2025-09-25",
  },
  {
    id: 3,
    name: "Michael Brown",
    phone: "+27 82 444 1111",
    email: "michael@example.com",
    totalBookings: 7,
    lastBooking: "2025-10-15",
  },
  {
    id: 4,
    name: "Emily Johnson",
    phone: "+27 73 321 9988",
    email: "emily@example.com",
    totalBookings: 3,
    lastBooking: "2025-09-28",
  },
];

export default function ClientsPage() {
  const [clients] = useState<Client[]>(mockClients);
  const [search, setSearch] = useState("");
  const router = useRouter();

  // Filter clients by search query
  const filteredClients = useMemo(() => {
    return clients.filter((c) =>
      [c.name, c.email, c.phone].some((field) =>
        field.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [clients, search]);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-y-6">
        <div className="flex gap-2 items-center">
          <Users />
          <h1 className="text-xl font-semibold">Clients</h1>
        </div>
        <button className="flex items-center justify-center gap-1 px-3 py-1.5 bg-gray-800 text-white rounded-lg hover:bg-gray-900">
          <Plus size={16} />
          Add Client
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>

      {/* Clients Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredClients.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-12">
            No clients found.
          </div>
        ) : (
          filteredClients.map((c) => (
            <div
              key={c.id}
              onClick={() => router.push(`/clients/${c.id}`)}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 hover:shadow-md hover:cursor-pointer transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gray-100 p-2 rounded-full">
                  <User className="text-gray-600" size={20} />
                </div>
                <div>
                  <div className="font-medium text-gray-800">{c.name}</div>
                  <div className="text-xs text-gray-500">
                    {c.totalBookings} bookings
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex items-center gap-1">
                  <Phone size={14} />
                  {c.phone}
                </div>
                <div className="flex items-center gap-1">
                  <Mail size={14} />
                  {c.email}
                </div>
                <div className="flex items-center gap-1 text-gray-500 mt-1">
                  <Calendar size={14} />
                  Last booking: {c.lastBooking}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
