import { IBooking } from "@/definitions/booking";
import mongoose, { Schema, Document, Model, Types } from "mongoose";
import Client from "@/models/client";
import BookingItem from "@/models/booking-item";

interface BookingDocument
  extends Document,
    Omit<IBooking, "id" | "clientId" | "bookingItems"> {
  clientId: Types.ObjectId;
  bookingItems: Types.ObjectId[];
}

const BookingSchema = new Schema<BookingDocument>(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: Client.modelName,
      required: true,
      index: true,
    },
    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    date: { type: Date, required: true },
    notes: { type: String },
    bookingItems: [{ type: Schema.Types.ObjectId, ref: BookingItem.modelName }],
  },
  { timestamps: true }
);

const Booking: Model<BookingDocument> =
  mongoose.models.Booking ||
  mongoose.model<BookingDocument>("Booking", BookingSchema);

export default Booking;
