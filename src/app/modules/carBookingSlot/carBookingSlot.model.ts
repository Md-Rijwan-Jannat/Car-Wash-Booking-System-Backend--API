import { Schema, model } from "mongoose";
import { ICarBookingSlot } from "./carBookingSlot.interface";

export const CarBookingSlotSchema = new Schema<ICarBookingSlot>({
  service: {
    type: Schema.Types.ObjectId,
    required: [true, "Service ID is required"],
    trim: true,
  },
  date: {
    type: String,
    required: [true, "Date is required"],
    trim: true,
  },
  startTime: {
    type: String,
    required: [true, "Start time is required"],
    trim: true,
  },
  endTime: {
    type: String,
    required: [true, "End time is required"],
    trim: true,
  },
});

export const CarBookingSlot = model<ICarBookingSlot>(
  "CarBookingSlot",
  CarBookingSlotSchema,
);
