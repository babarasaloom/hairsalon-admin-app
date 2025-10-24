import { ICategory } from "@/definitions/category";
import mongoose, { Schema, Document, Model } from "mongoose";

interface CategoryDocument extends Document, Omit<ICategory, "id"> {}

const CategorySchema = new Schema<CategoryDocument>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    imageUrl: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

CategorySchema.index({ name: "text", description: "text" });

const Category: Model<CategoryDocument> =
  mongoose.models.Category ||
  mongoose.model<CategoryDocument>("Category", CategorySchema);

export default Category;
