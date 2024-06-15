import httpStatus from "http-status";
import { AppError } from "../../error/AppError";
import { CarService } from "../carService/carService.model";
import { ICarBookingSlot } from "./carBookingSlot.interface";
import { CarBookingSlot } from "./carBookingSlot.model";
import { GenerateTimeSlots } from "./carBookingSlot.utils";

const createCrBookingSlotIntoDB = async (payload: ICarBookingSlot) => {
  console.log(payload);

  const isCarServiceExisting = await CarService.findById(payload.service);

  // ---> check if the service exists
  if (!isCarServiceExisting) {
    throw new AppError(httpStatus.NOT_FOUND, "Service does not exist");
  }

  // ---> service duration in minutes
  const duration = isCarServiceExisting.duration;

  try {
    // ---> generate slots
    const slots = await GenerateTimeSlots(payload, duration);

    if (slots.length === 0) {
      throw new AppError(httpStatus.NOT_FOUND, "Data Not Found");
    }

    // ---> Save all slots to the database
    const result = await CarBookingSlot.insertMany(slots);

    return result;
  } catch (error: any) {
    // Handle specific errors from slot generation
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

const getAllAvailableCarBookingSlotsFromDB = async () => {
  const result = await CarBookingSlot.find({ isBooked: "available" }).populate(
    "service",
  );

  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "Data Not Found");
  }
  return result;
};

export const CarBookingSlotService = {
  createCrBookingSlotIntoDB,
  getAllAvailableCarBookingSlotsFromDB,
};
