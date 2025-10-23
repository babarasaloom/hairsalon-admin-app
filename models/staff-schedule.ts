import mongoose, { Schema, Document, Model } from "mongoose";
import Staff from "./staff";

export interface StaffScheduleDocument extends Document {
  staffId: mongoose.Types.ObjectId;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const StaffScheduleSchema = new Schema<StaffScheduleDocument>(
  {
    staffId: {
      type: Schema.Types.ObjectId,
      ref: Staff.modelName,
      required: true,
    },
    dayOfWeek: {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      required: true,
    },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

StaffScheduleSchema.index({ staffId: 1, dayOfWeek: 1 });

const StaffSchedule: Model<StaffScheduleDocument> =
  mongoose.models.StaffSchedule ||
  mongoose.model<StaffScheduleDocument>("StaffSchedule", StaffScheduleSchema);

export default StaffSchedule;
