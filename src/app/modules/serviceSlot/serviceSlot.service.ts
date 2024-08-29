/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { AppError } from "../../error/AppError";
import { CarService } from "../carService/carService.model";
import { IServiceSlot, ICarService } from "./serviceSlot.interface";
import { ServiceSlot } from "./serviceSlot.model";
import { GenerateTimeSlots } from "./serviceSlot.utils";
import QueryBuilder from "../../builder/QueryBuilder";
import { ServiceSlotsSearchableFields } from "./serviceSlot.constants";

const createServiceSlotIntoDB = async (payload: ICarService) => {
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
    const result = await ServiceSlot.insertMany(slots);

    return result;
  } catch (error: any) {
    // Handle specific errors from slot generation
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

const getAllAvailableServiceSlotsFromDB = async (
  query: Record<string, unknown>,
) => {
  const carBookingSlotQueryBuilder = new QueryBuilder(
    ServiceSlot.find({ isBooked: "available" }),
    query,
  )
    .search(ServiceSlotsSearchableFields)
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

const getAllServiceSlotsFromDB = async (serviceId: string) => {
  const result = await ServiceSlot.find({ service: serviceId }).populate(
    "service",
  );

  if (result.length === 0 || !result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "For this service slots are not available",
    );
  }

  return result;
};

const updateServiceSlotStatusFromDB = async (
  payload: { isBooked: IServiceSlot },
  slotId: string,
) => {
  const carBookingSlot = await ServiceSlot.findById(slotId);

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

  const result = await ServiceSlot.findByIdAndUpdate(_id, payload, {
    new: true,
  });

  return result;
};

export const CarBookingSlotService = {
  createServiceSlotIntoDB,
  getAllAvailableServiceSlotsFromDB,
  getAllServiceSlotsFromDB,
  updateServiceSlotStatusFromDB,
};
