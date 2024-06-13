import httpStatus from "http-status";
import mongoose from "mongoose";
import { AppError } from "../../error/AppError";
import { CarService } from "../carService/carService.model";
import { ICarServiceBooking } from "./carServiceBooking.interface";
import { CarServiceBooking } from "./carServiceBooking.model";
import { CarBookingSlot } from "../carBookingSlot/carBookingSlot.model";

// ---> create car booking service with transaction
const createCarServiceBookingIntoDB = async (payload: ICarServiceBooking) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const isCarServiceExisting = await CarService.findById(
      payload.serviceId,
    ).session(session);
    if (!isCarServiceExisting) {
      throw new AppError(httpStatus.NOT_FOUND, "Service is not found");
    }

    const isCarBookingSlotExisting = await CarBookingSlot.findById(
      payload.slotId,
    ).session(session);
    if (!isCarBookingSlotExisting) {
      throw new AppError(httpStatus.NOT_FOUND, "Slot is not found");
    }

    if (isCarBookingSlotExisting.isBooked === "available") {
      await CarBookingSlot.findByIdAndUpdate(
        payload.slotId,
        { isBooked: "booked" },
        { new: true, runValidators: true, session },
      );
    } else {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Slot is already ${isCarBookingSlotExisting.isBooked}`,
      );
    }

    const result = await CarServiceBooking.create([payload], { session });

    const populateResult = await CarServiceBooking.findById(result[0]._id)
      .populate("serviceId")
      .populate("slotId")
      .session(session);

    await session.commitTransaction();
    session.endSession();

    return populateResult;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// ---> get all car service booking data
const getAllCarServiceBookingFromDB = async () => {
  const result = await CarServiceBooking.find()
    .populate("serviceId")
    .populate("slotId");

  return result;
};

// ---> get all my car service booking data
const getAllMyCarServiceBookingFromDB = async () => {
  const result = await CarServiceBooking.find()
    .populate("serviceId")
    .populate("slotId");

  return result;
};

export const CarServiceBookingService = {
  createCarServiceBookingIntoDB,
  getAllCarServiceBookingFromDB,
  getAllMyCarServiceBookingFromDB,
};
