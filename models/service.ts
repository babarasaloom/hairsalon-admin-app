import { IService } from "@/definitions/service";
import mongoose, { Schema, Document, Model, Types } from "mongoose";
import Category from "@/models/category";

interface ServiceDocument
  extends Document,
    Omit<IService, "id" | "categoryId"> {
  categoryId: Types.ObjectId;
}

const ServiceSchema = new Schema<ServiceDocument>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    duration: { type: Number, required: true, min: 0 },
    imageUrl: { type: String },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: Category.modelName,
      required: true,
      index: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ServiceSchema.index({ name: "text", description: "text" });

const Service: Model<ServiceDocument> =
  mongoose.models.Service ||
  mongoose.model<ServiceDocument>("Service", ServiceSchema);

export default Service;
