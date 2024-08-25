/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { AppError } from "../../error/AppError";
import { CarService } from "../carService/carService.model";
import { IBookingStatus, ICarBookingSlot } from "./carBookingSlot.interface";
import { CarBookingSlot } from "./carBookingSlot.model";
import { GenerateTimeSlots } from "./carBookingSlot.utils";
import QueryBuilder from "../../builder/QueryBuilder";
import { CarBookingSlotsSearchableFields } from "./carBookingSlots.constants";

const createCrBookingSlotIntoDB = async (payload: ICarBookingSlot) => {
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

const getAllAvailableCarBookingSlotsFromDB = async (
  query: Record<string, unknown>,
) => {
  const carBookingSlotQueryBuilder = new QueryBuilder(
    CarBookingSlot.find({ isBooked: "available" }),
    query,
  )
    .search(CarBookingSlotsSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result =
    await carBookingSlotQueryBuilder.modelQuery.populate("service");

  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "Data Not Found");
  }

  const meta = await carBookingSlotQueryBuilder.countTotal();

  return {
    meta,
    result,
  };
};

const updateCarBookingStatusFromDB = async (
  payload: { isBooked: IBookingStatus },
  slotId: string,
) => {
  const carBookingSlot = await CarBookingSlot.findById(slotId);

  if (!carBookingSlot) {
    throw new AppError(httpStatus.NOT_FOUND, "Slot not found");
  }

  const { isBooked, _id } = carBookingSlot;

  if (isBooked === "booked" && payload.isBooked === "booked") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Slot is already booked and cannot be re-booked",
    );
  }

  if (isBooked === "canceled" && payload.isBooked === "canceled") {
    throw new AppError(httpStatus.BAD_REQUEST, "Slot is already canceled");
  }
  if (isBooked === "available" && payload.isBooked === "booked") {
    throw new AppError(httpStatus.BAD_REQUEST, "You cannot book a slot");
  }

  const result = await CarBookingSlot.findByIdAndUpdate(_id, payload, {
    new: true,
  });

  return result;
};

export const CarBookingSlotService = {
  createCrBookingSlotIntoDB,
  getAllAvailableCarBookingSlotsFromDB,
  updateCarBookingStatusFromDB,
};
