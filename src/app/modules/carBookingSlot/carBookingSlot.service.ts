import httpStatus from "http-status";
import { AppError } from "../../error/AppError";
import { CarService } from "../carService/carService.model";
import { ICarBookingSlot } from "./carBookingSlot.interface";
import { CarBookingSlot } from "./carBookingSlot.model";
import { GenerateTimeSlots } from "./carBookingSlot.utils";

// ---> create car booking slot service
const createCrBookingSlotIntoDB = async (payload: ICarBookingSlot) => {
  console.log(payload);

  const isCarServiceExisting = await CarService.findById(payload.service);

  // ---> check if the service exists
  if (!isCarServiceExisting) {
    throw new AppError(httpStatus.NOT_FOUND, "Service does not exist");
  }

  // ---> service duration in minutes
  const duration = isCarServiceExisting.duration;

  // ---> generate slots
  const slots = GenerateTimeSlots(payload, duration);

  // ---> Save all slots to the database
  const result = await CarBookingSlot.insertMany(slots);
  return result;
};

const getAllAvailableCarBookingSlotsFromDB = async () => {
  const result = await CarBookingSlot.find({ isBooked: "available" }).populate(
    "service",
  );
  return result;
};

export const CarBookingSlotService = {
  createCrBookingSlotIntoDB,
  getAllAvailableCarBookingSlotsFromDB,
};
