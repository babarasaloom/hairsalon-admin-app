"use client";

import { useState } from "react";
import {
  Scissors,
  Edit,
  Plus,
  X,
  Trash2,
  Power,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface Service {
  id: number;
  name: string;
  price: string;
  duration: string;
  category: string;
  active: boolean;
}

const categories = ["All", "Haircut", "Coloring", "Styling", "Treatment"];

const mockServices: Service[] = [
  {
    id: 1,
    name: "Men's Haircut",
    price: "$25",
    duration: "30 min",
    category: "Haircut",
    active: true,
  },
  {
    id: 2,
    name: "Hair Coloring",
    price: "$60",
    duration: "1h 30min",
    category: "Coloring",
    active: true,
  },
  {
    id: 3,
    name: "Wash & Blow Dry",
    price: "$30",
    duration: "45 min",
    category: "Styling",
    active: false,
  },
  {
    id: 4,
    name: "Deep Conditioning",
    price: "$40",
    duration: "1h",
    category: "Treatment",
    active: true,
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "",
    category: "Haircut",
    active: true,
  });

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData(service);
    } else {
      setEditingService(null);
      setFormData({
        name: "",
        price: "",
        duration: "",
        category: "Haircut",
        active: true,
      });
    }
    setShowModal(true);
  };

  const handleSaveService = () => {
    if (!formData.name || !formData.price || !formData.duration) return;

    if (editingService) {
      setServices((prev) =>
        prev.map((s) =>
          s.id === editingService.id ? { ...editingService, ...formData } : s
        )
      );
    } else {
      const newService: Service = {
        id: Date.now(),
        name: formData.name,
        price: formData.price,
        duration: formData.duration,
        category: formData.category,
        active: formData.active,
      };
      setServices((prev) => [...prev, newService]);
    }
    setShowModal(false);
  };

  const handleDeleteService = (id: number) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const toggleServiceStatus = (id: number) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const filteredServices =
    activeCategory === "All"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <div className="">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-y-6">
        <div className="flex gap-2 items-center">
          <Scissors />
          <h1 className="text-xl font-semibold">Services</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center w-full md:w-fit gap-1 px-3 py-1.5 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
          >
            <Plus size={16} />
            Add Service
          </button>
          <Link
            href="/categories"
            className="flex items-center justify-center gap-2 text-center px-3 w-full md:w-fit block py-1.5 border border-gray-300 rounded-lg text-gray-700 text-sm hover:bg-gray-50"
          >
            Categories
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-2 space-x-2 mb-4 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full border text-sm transition ${
              activeCategory === cat
                ? "bg-gray-800 text-white border-gray-800"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Service Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((s) => (
          <div
            key={s.id}
            className={`border rounded-2xl shadow-sm p-4 flex flex-col justify-between transition duration-200 ${
              s.active
                ? "bg-white border-gray-200 hover:shadow-md"
                : "bg-gray-100 border-gray-300 opacity-75"
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Scissors size={18} className="text-gray-600" />
                <div className="font-medium text-gray-800">{s.name}</div>
              </div>
              <div className="text-gray-600 text-sm">{s.duration}</div>
              <div className="text-gray-700 font-semibold">{s.price}</div>
              <div className="text-xs text-gray-500 mt-1">{s.category}</div>
              <div
                className={`mt-2 inline-block text-xs px-2 py-0.5 rounded-full ${
                  s.active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {s.active ? "Active" : "Inactive"}
              </div>
            </div>

            <div className="mt-3 flex justify-end gap-3">
              <button
                onClick={() => toggleServiceStatus(s.id)}
                className={`text-gray-500 hover:text-${
                  s.active ? "red" : "green"
                }-600 transition`}
                title={s.active ? "Deactivate" : "Activate"}
              >
                <Power size={18} />
              </button>
              <button
                onClick={() => handleOpenModal(s)}
                className="text-gray-500 hover:text-blue-600 transition"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => handleDeleteService(s.id)}
                className="text-gray-500 hover:text-red-600 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-end sm:items-center z-50">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:w-[420px] p-5 shadow-lg animate-slideUp sm:animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {editingService ? "Edit Service" : "Add Service"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Service Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <input
                type="text"
                placeholder="Duration (e.g. 45 min)"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <input
                type="text"
                placeholder="Price (e.g. $30)"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              />

              {/* Category Select */}
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-gray-400"
              >
                {categories
                  .filter((cat) => cat !== "All")
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>

              {/* Active toggle */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) =>
                    setFormData({ ...formData, active: e.target.checked })
                  }
                  id="active"
                  className="w-4 h-4 text-gray-800 border-gray-300 rounded focus:ring-gray-400"
                />
                <label htmlFor="active" className="text-sm text-gray-700">
                  Active
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveService}
                  className="px-4 py-1.5 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-900 transition"
                >
                  {editingService ? "Save Changes" : "Add Service"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
