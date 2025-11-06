"use client";

import { useState, useEffect } from "react";
import CategoryModal from "../modal";
import { IArtistPrice } from "@/definitions/artist-price";
import { deleteArtistPrice, getArtistPrices } from "@/services/artist-price";
import { ServiceList } from "./list";
import ArtistPriceForm from "./add-price-form";
import Link from "next/link";
import DeleteModal from "./delete-modal";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  staffId: string;
}

export default function ArtistPricingManager({ staffId }: Props) {
  const [artistPrices, setArtistPrices] = useState<IArtistPrice[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<any | null>(null);
  const router = useRouter();

  async function fetchArtistPrices() {
    try {
      const prices = await getArtistPrices(staffId);
      setArtistPrices(prices);
    } catch (error) {
      console.error("Error loading artist prices:", error);
    }
  }

  useEffect(() => {
    fetchArtistPrices();
  }, [staffId]);

  const handleSelectPrice = (price: any) => {
    setSelectedPrice(price);
    setIsModalOpen(true);
  };

  const handleDeleteRequest = (price: any) => {
    setSelectedPrice(price);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedPrice) return;
    try {
      await deleteArtistPrice(selectedPrice.id);
      setArtistPrices((prev) => prev.filter((p) => p.id !== selectedPrice.id));
    } catch (error) {
      console.error("Failed to delete artist price:", error);
    } finally {
      setIsDeleteModalOpen(false);
      setSelectedPrice(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Service Pricing</h2>
        <Link
          href={`/staff/${staffId}/add-price`}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition"
        >
          <Plus size={16} /> Add Price
        </Link>
      </div>

      {/* Artist Prices Grid */}
      <ServiceList
        artistPrices={artistPrices}
        onEdit={(service) => handleSelectPrice(service)}
        onDelete={(service) => handleDeleteRequest(service)}
      />

      {/* Add/Edit Price Modal */}
      <CategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedPrice && (
          <ArtistPriceForm
            service={{
              id: selectedPrice.serviceId,
              name: selectedPrice.name,
              description: selectedPrice.description,
              categoryId: selectedPrice.categoryId,
              imageUrl: selectedPrice.imageUrl,
              duration: selectedPrice.duration,
              isActive: true,
            }}
            artistPrice={{
              id: selectedPrice.id,
              price: selectedPrice.price,
              serviceId: selectedPrice.serviceId,
              staffId: selectedPrice.staffId,
            }}
            onClose={() => {
              setIsModalOpen(false);
              fetchArtistPrices();
            }}
          />
        )}
      </CategoryModal>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={selectedPrice?.name || "this service"}
      />
    </div>
  );
}
