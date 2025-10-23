import mongoose, { Schema, Document, Model } from "mongoose";

export interface AdminUserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "manager";
  createdAt?: Date;
  updatedAt?: Date;
}

const AdminUserSchema = new Schema<AdminUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "manager"], default: "admin" },
  },
  { timestamps: true }
);

const AdminUser: Model<AdminUserDocument> =
  mongoose.models.AdminUser ||
  mongoose.model<AdminUserDocument>("AdminUser", AdminUserSchema);

export default AdminUser;
