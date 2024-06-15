import httpStatus from "http-status";
import mongoose from "mongoose";
import { AppError } from "../../error/AppError";
import { CarService } from "../carService/carService.model";
import { ICarServiceBookingPayload } from "./carServiceBooking.interface";
import { CarServiceBooking } from "./carServiceBooking.model";
import { CarBookingSlot } from "../carBookingSlot/carBookingSlot.model";
import { SignUPUser } from "../signUpUser/signUpUser.model";
import { JwtPayload } from "jsonwebtoken";

// Create car booking service with transaction
const createCarServiceBookingIntoDB = async (
  payload: ICarServiceBookingPayload,
  email: string,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the customer by email
    const customer = await SignUPUser.findOne({ email });
    if (!customer) {
      throw new AppError(httpStatus.NOT_FOUND, "Customer not found");
    }

    // Find the car service by ID
    const isCarServiceExisting = await CarService.findById(
      payload.serviceId,
    ).session(session);
    if (!isCarServiceExisting) {
      throw new AppError(httpStatus.NOT_FOUND, "Service is not found");
    }

    // Find the car booking slot by ID
    const isCarBookingSlotExisting = await CarBookingSlot.findById(
      payload.slotId,
    ).session(session);
    if (!isCarBookingSlotExisting) {
      throw new AppError(httpStatus.NOT_FOUND, "Slot is not found");
    }

    // Check if the slot is available
    if (isCarBookingSlotExisting.isBooked === "available") {
      // Update the slot to booked
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

    // Create the car service booking
    const result = await CarServiceBooking.create(
      [
        {
          customer: customer._id,
          service: payload.serviceId,
          slot: payload.slotId,
          vehicleType: payload.vehicleType,
          vehicleBrand: payload.vehicleBrand,
          vehicleModel: payload.vehicleModel,
          manufacturingYear: payload.manufacturingYear,
          registrationPlate: payload.registrationPlate,
        },
      ],
      {
        session,
      },
    );

    // Populate the result with related data
    const populateResult = await CarServiceBooking.findById(result[0]._id)
      .populate("customer")
      .populate("service")
      .populate("slot")
      .session(session);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return populateResult;
  } catch (error) {
    // Abort the transaction in case of an error
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// ---> get all car service booking data
const getAllCarServiceBookingFromDB = async () => {
  const result = await CarServiceBooking.find()
    .populate("customer")
    .populate("service")
    .populate("slot");

  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "Data Not Found");
  }

  return result;
};

// ---> get all my car service booking data
const getAllMyCarServiceBookingFromDB = async (payload: JwtPayload) => {
  const isUserExisting = await SignUPUser.findOne({ email: payload.email });

  const result = await CarServiceBooking.find({ customer: isUserExisting?._id })
    .select("-customer")
    .populate("service")
    .populate("slot");

  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "Data Not Found");
  }

  return result;
};

export const CarServiceBookingService = {
  createCarServiceBookingIntoDB,
  getAllCarServiceBookingFromDB,
  getAllMyCarServiceBookingFromDB,
};
