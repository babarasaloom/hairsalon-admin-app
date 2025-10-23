import { IClient } from "@/definitions/client";
import mongoose, { Schema, Document, Model } from "mongoose";

interface ClientDocument extends Document, Omit<IClient, "id"> {}

const ClientSchema = new Schema<ClientDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    avatarUrl: { type: String },
    notes: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ClientSchema.index({ name: "text", email: "text", phone: "text" });

const Client: Model<ClientDocument> =
  mongoose.models.Client ||
  mongoose.model<ClientDocument>("Client", ClientSchema);

export default Client;
