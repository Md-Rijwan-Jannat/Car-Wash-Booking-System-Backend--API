import { Schema, model } from "mongoose";
import { ICarService, ICarServiceModel } from "./carService.interface";

export const carServiceSchema = new Schema<ICarService, ICarServiceModel>(
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

// Query Middleware
carServiceSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

carServiceSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

carServiceSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

carServiceSchema.statics.isCarServiceExists = async function (name: string) {
  return await this.findOne({ name });
};

export const CarService = model<ICarService, ICarServiceModel>(
  "CarService",
  carServiceSchema,
);
