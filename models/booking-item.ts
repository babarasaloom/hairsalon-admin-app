import { IBookingItem } from "@/definitions/booking";
import mongoose, { Schema, Document, Model, Types } from "mongoose";
import Booking from "@/models/booking";
import Service from "@/models/service";
import Staff from "@/models/staff";
import ArtistPrice from "@/models/artist-price";

interface BookingItemDocument
  extends Document,
    Omit<
      IBookingItem,
      "id" | "bookingId" | "serviceId" | "staffId" | "artistPriceId"
    > {
  bookingId: Types.ObjectId;
  serviceId: Types.ObjectId;
  staffId: Types.ObjectId;
  artistPriceId?: Types.ObjectId;
}

const BookingItemSchema = new Schema<BookingItemDocument>(
  {
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: Booking.modelName,
      required: true,
      index: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: Service.modelName,
      required: true,
    },
    staffId: {
      type: Schema.Types.ObjectId,
      ref: Staff.modelName,
      required: true,
    },
    artistPriceId: {
      type: Schema.Types.ObjectId,
      ref: ArtistPrice.modelName,
    },
    serviceName: { type: String, required: true },
    serviceDuration: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

const BookingItem: Model<BookingItemDocument> =
  mongoose.models.BookingItem ||
  mongoose.model<BookingItemDocument>("BookingItem", BookingItemSchema);

export default BookingItem;
