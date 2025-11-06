"use server";

import { revalidatePath } from "next/cache";
import {
  createArtistPrice,
  updateArtistPrice,
  getArtistPrices,
  deleteArtistPrice,
} from "@/services/artist-price";
import { IArtistPrice } from "@/definitions/artist-price";
import { artistPriceFormSchema } from "@/validations/artist-price";

export async function saveArtistPriceAction(
  serviceId: string,
  staffId: string,
  artistPriceId: string,
  _prevState: any,
  formData: FormData
) {
  try {
    const parsed = artistPriceFormSchema.safeParse({
      price: formData.get("price"),
    });

    if (!parsed.success) {
      return {
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const data = {
      serviceId,
      staffId,
      price: parsed.data.price,
    };

    let result;

    if (artistPriceId !== "") {
      // Update existing artist price
      result = await updateArtistPrice(artistPriceId, data);
    } else {
      // Create new artist price
      result = await createArtistPrice(data);
    }

    if (!result.success) {
      return { message: result.message || "Failed to save artist price" };
    }

    // Revalidate staff pricing page
    revalidatePath(`/staff/${staffId}`);

    // return { message: "Artist price saved successfully!" };
  } catch (error) {
    console.error("Error saving artist price:", error);
    return { message: "Something went wrong while saving the artist price." };
  }
}

/**
 * Create or update an artist price.
 * Automatically decides based on whether an ID is provided.
 */
export async function createArtistPriceAction(
  prevState: any,
  formData: FormData
) {
  try {
    const id = formData.get("id")?.toString();
    const staffId = formData.get("staffId")?.toString()!;
    const serviceId = formData.get("serviceId")?.toString()!;
    const price = parseFloat(formData.get("price")?.toString() || "0");

    if (!staffId || !serviceId || isNaN(price)) {
      return {
        message: "Missing or invalid data.",
        errors: { price: "Please provide valid input values." },
      };
    }

    const data: IArtistPrice = { id, staffId, serviceId, price };

    if (id) {
      await updateArtistPrice(id, data);
    } else {
      await createArtistPrice(data);
    }

    revalidatePath(`/staffs/${staffId}`);
    return { message: "Artist price saved successfully.", errors: {} };
  } catch (error: any) {
    console.error("Error in createArtistPriceAction:", error.message);
    return {
      message: "Failed to save artist price.",
      errors: { global: error.message },
    };
  }
}

/**
 * Get all artist prices for a staff.
 */
export async function getArtistPricesAction(staffId: string) {
  try {
    return await getArtistPrices(staffId);
  } catch (error: any) {
    console.error("Error in getArtistPricesAction:", error.message);
    return [];
  }
}

/**
 * Delete an artist price by ID.
 */
export async function deleteArtistPriceAction(staffId: string, id: string) {
  try {
    await deleteArtistPrice(id);
    revalidatePath(`/staffs/${staffId}`);
    return { success: true };
  } catch (error: any) {
    console.error("Error in deleteArtistPriceAction:", error.message);
    return { success: false, message: error.message };
  }
}
function getArtistPriceByService(staffId: string, serviceId: string) {
  throw new Error("Function not implemented.");
}
