import { IArtistPrice } from "@/definitions/artist-price";
import mongoose, { Schema, Document, Model, Types } from "mongoose";
import Service from "@/models/service";
import Staff from "@/models/staff";

interface ArtistPriceDocument
  extends Document,
    Omit<IArtistPrice, "id" | "staffId" | "serviceId"> {
  staffId: Types.ObjectId;
  serviceId: Types.ObjectId;
}

const ArtistPriceSchema = new Schema<ArtistPriceDocument>(
  {
    staffId: {
      type: Schema.Types.ObjectId,
      ref: Staff.modelName,
      required: true,
      index: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: Service.modelName,
      required: true,
      index: true,
    },
    price: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

ArtistPriceSchema.index({ staffId: 1, serviceId: 1 }, { unique: true });

const ArtistPrice: Model<ArtistPriceDocument> =
  mongoose.models.ArtistPrice ||
  mongoose.model<ArtistPriceDocument>("ArtistPrice", ArtistPriceSchema);

export default ArtistPrice;
