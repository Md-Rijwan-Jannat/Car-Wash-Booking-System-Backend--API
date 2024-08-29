import { Schema, model } from "mongoose";
import { ICarService } from "./serviceSlot.interface";

export const serviceSlotsSchema = new Schema<ICarService>({
  service: {
    type: Schema.Types.ObjectId,
    required: [true, "Service ID is required"],
    ref: "CarService",
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
  isBooked: {
    type: String,
    enum: ["available", "booked", "canceled"],
    default: "available",
  },
});

export const ServiceSlot = model<ICarService>(
  "ServiceSlot",
  serviceSlotsSchema,
);
