import { IStaff } from "@/definitions/staff";
import mongoose, { Schema, Document, Model } from "mongoose";

interface StaffDocument extends Document, Omit<IStaff, "id"> {}

const StaffSchema = new Schema<StaffDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    contactNumber: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: ["stylist", "receptionist", "manager", "admin"],
      required: true,
    },
    avatarUrl: { type: String },
    services: [{ type: Schema.Types.ObjectId, ref: "Service" }],
    workingHours: { type: String, default: "09:00 AM – 5:00 PM" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

StaffSchema.index({ name: "text", email: "text" });

const Staff: Model<StaffDocument> =
  mongoose.models.Staff || mongoose.model<StaffDocument>("Staff", StaffSchema);

export default Staff;
