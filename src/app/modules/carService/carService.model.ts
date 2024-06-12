import { Schema, model } from "mongoose";
import { ICarService } from "./carService.interface";

export const carServiceSchema = new Schema<ICarService>(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price name is required"],
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, "Duration name is required"],
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const CarService = model<ICarService>("CarService", carServiceSchema);
