import { Schema, model } from "mongoose";
import { IServiceSlotBooking } from "./serviceSlotBooking.interface";
import { vehicleTypeArray } from "./serviceSlotBooking.constants";

const serviceSlotBookingSchema = new Schema<IServiceSlotBooking>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "SignUpUser",
    },
    service: [
      {
        type: Schema.Types.ObjectId,
        required: [true, "Service ID is required"],
        ref: "CarService",
      },
    ],
    slot: [
      {
        type: Schema.Types.ObjectId,
        ref: "ServiceSlot",
        required: true,
      },
    ],
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
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
    transitionId: {
      type: String,
      required: [true, "Transition Id is required"],
      trim: true,
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      trim: true,
    },
    paymentStatus: {
      type: String,
      required: [true, "Vehicle type is required"],
      enum: {
        values: ["Pending", "Paid", "Failed"],
        message: "Payment status type must be one of: {VALUE}",
      },
      default: "Pending",
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

export const ServiceSlotBooking = model<IServiceSlotBooking>(
  "ServiceSlotBooking",
  serviceSlotBookingSchema,
);
