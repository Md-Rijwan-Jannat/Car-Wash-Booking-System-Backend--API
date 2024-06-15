import { Schema, model } from "mongoose";
import { ICarServiceBooking } from "./carServiceBooking.interface";
import { vehicleTypeArray } from "./carServiceBooking.constants";

const carServiceBookingSchema = new Schema<ICarServiceBooking>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "SignUpUser",
    },
    service: {
      type: Schema.Types.ObjectId,
      required: [true, "Service ID is required"],
      ref: "CarService",
    },
    slot: {
      type: Schema.Types.ObjectId,
      required: [true, "Slot ID is required"],
      ref: "CarBookingSlot",
    },
    vehicleType: {
      type: String,
      required: [true, "Vehicle type is required"],
      enum: {
        values: vehicleTypeArray,
        message: "Vehicle type must be one of: {VALUE}",
      },
      trim: true,
    },
    vehicleBrand: {
      type: String,
      required: [true, "Vehicle brand is required"],
      trim: true,
    },
    vehicleModel: {
      type: String,
      required: [true, "Vehicle model is required"],
      trim: true,
    },
    manufacturingYear: {
      type: Number,
      required: [true, "Manufacturing year is required"],
      trim: true,
    },
    registrationPlate: {
      type: String,
      required: [true, "Registration plate is required"],
      trim: true,
    },
  },
  { timestamps: true },
);

export const CarServiceBooking = model<ICarServiceBooking>(
  "CarServiceBooking",
  carServiceBookingSchema,
);
