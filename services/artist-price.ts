"use server";
import ArtistPrice from "@/models/artist-price";
import { IArtistPrice } from "@/definitions/artist-price";
import { connectDB } from "@/lib/db";
import { Types } from "mongoose";
import Service from "@/models/service";
import { IService } from "@/definitions/service";

/**
 * Create a new artist price entry.
 */
export async function createArtistPrice(data: IArtistPrice) {
  await connectDB();
  try {
    const existing = await ArtistPrice.findOne({
      staffId: data.staffId,
      serviceId: data.serviceId,
    });

    if (existing) {
      throw new Error("Artist price for this service already exists.");
    }

    const artistPrice = await ArtistPrice.create({
      staffId: new Types.ObjectId(data.staffId),
      serviceId: new Types.ObjectId(data.serviceId),
      price: data.price,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return JSON.parse(JSON.stringify(artistPrice));
  } catch (error: any) {
    console.error("Error creating artist price:", error.message);
    throw new Error("Failed to create artist price");
  }
}

/**
 * Update an existing artist price by ID.
 */
export async function updateArtistPrice(
  id: string,
  data: Partial<IArtistPrice>
) {
  await connectDB();
  try {
    const updated = await ArtistPrice.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    );

    if (!updated) throw new Error("Artist price not found");

    return JSON.parse(JSON.stringify(updated));
  } catch (error: any) {
    console.error("Error updating artist price:", error.message);
    throw new Error("Failed to update artist price" + error.message);
  }
}

/**
 * Get all artist prices for a specific staff.
 */
export async function getArtistPrices(staffId: string) {
  await connectDB();
  try {
    const prices = (await ArtistPrice.find({ staffId })
      .populate("serviceId", "name categoryId imageUrl description duration")
      .sort({ createdAt: -1 })
      .lean()) as any[];

    const pricesMap = prices.map((price) => ({
      id: price._id.toString(),
      staffId: price.staffId.toString(),
      serviceId: price.serviceId._id.toString(),
      price: price.price.toString(),
      createdAt: price.createdAt.toString(),
      updatedAt: price.updatedAt.toString(),
      name: price.serviceId.name,
      imageUrl: price.serviceId.imageUrl,
      description: price.serviceId.description,
      categoryId: price.serviceId.categoryId._id.toString(),
      duration: price.serviceId.duration,
    }));

    return JSON.parse(JSON.stringify(pricesMap));
  } catch (error: any) {
    console.error("Error fetching artist prices:", error.message);
    throw new Error("Failed to get artist prices");
  }
}

/**
 * Delete an artist price by ID.
 */
export async function deleteArtistPrice(id: string) {
  await connectDB();
  try {
    const deleted = await ArtistPrice.findByIdAndDelete(id);
    if (!deleted) throw new Error("Artist price not found");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting artist price:", error.message);
    throw new Error("Failed to delete artist price");
  }
}

/**
 * Returns the services that an artist does not have prices for yet.
 * @param staffId - The ID of the artist/staff
 */

export async function getServicesWithoutPrice(
  staffId: string
): Promise<{ success: boolean; data?: IService[] }> {
  try {
    await connectDB();

    // 1. Get service IDs the artist already priced
    const artistPrices = await ArtistPrice.find(
      { staffId },
      "serviceId"
    ).lean();

    const pricedServiceIds = artistPrices.map((p: any) =>
      p.serviceId?.toString()
    );

    // 2. Get all services not in that list
    const unpricedServices = await Service.find({
      _id: { $nin: pricedServiceIds },
    })
      .populate("categoryId", "name")
      .sort({ createdAt: -1 })
      .lean();

    // 3. Format for frontend
    const formatted = unpricedServices.map((s: any) => ({
      id: s._id.toString(),
      name: s.name,
      imageUrl: s.imageUrl,
      description: s.description,
      categoryId: s.categoryId?._id?.toString(),
      category: s.categoryId?.name,
      duration: s.duration,
      isActive: s.isActive,
    }));

    return {
      success: true,
      data: JSON.parse(JSON.stringify(formatted)),
    };
  } catch (error) {
    console.error("Error fetching unpriced services:", error);
    return { success: false };
  }
}
