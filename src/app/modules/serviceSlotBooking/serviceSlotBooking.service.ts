import httpStatus from "http-status";
import mongoose from "mongoose";
import { AppError } from "../../error/AppError";
import { CarService } from "../carService/carService.model";
import { ServiceSlot } from "../serviceSlot/serviceSlot.model";
import { SignUPUser } from "../signUpUser/signUpUser.model";
import { JwtPayload } from "jsonwebtoken";
import QueryBuilder from "../../builder/QueryBuilder";
import { initialPayment } from "../paymanet/payment.utils";
import { ServiceSlotBooking } from "./serviceSlotBooking.model";
import { IServiceSlotBookingPayload } from "./serviceSlotBooking.interface";
import { ServiceSlotBookingSearchableFields } from "./serviceSlotBooking.constants";

// Create car booking service with transaction
const createCarServiceBookingIntoDB = async (
  payload: IServiceSlotBookingPayload,
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
    const isCarBookingSlotExisting = await ServiceSlot.findById(
      payload.slotId,
    ).session(session);
    if (!isCarBookingSlotExisting) {
      throw new AppError(httpStatus.NOT_FOUND, "Slot is not found");
    }

    // Check if the slot is available
    if (isCarBookingSlotExisting.isBooked === "available") {
      // Update the slot to booked
      await ServiceSlot.findByIdAndUpdate(
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
    const result = await ServiceSlotBooking.create(
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
    const populateResult = await ServiceSlotBooking.findById(result[0]._id)
      .populate("customer")
      .populate("service")
      .populate("slot")
      .session(session);

    // payment calling
    initialPayment();

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
const getAllCarServiceBookingFromDB = async (
  query: Record<string, unknown>,
) => {
  const carServiceBookingQueryBuilder = new QueryBuilder(
    ServiceSlotBooking.find()
      .populate("customer")
      .populate("service")
      .populate("slot"),
    query,
  )
    .search(ServiceSlotBookingSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await carServiceBookingQueryBuilder.modelQuery;
  const meta = await carServiceBookingQueryBuilder.countTotal();

  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "Data Not Found");
  }

  return {
    meta,
    result,
  };
};

// ---> get all my car service booking data
const getAllMyCarServiceBookingFromDB = async (
  query: Record<string, unknown>,
  payload: JwtPayload,
) => {
  const isUserExisting = await SignUPUser.findOne({ email: payload.email });

  const myCarServiceBookingQueryBuilder = new QueryBuilder(
    ServiceSlotBooking.find({ customer: isUserExisting?._id })
      .select("-customer")
      .populate("service")
      .populate("slot"),
    query,
  )
    .search(ServiceSlotBookingSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await myCarServiceBookingQueryBuilder.modelQuery;
  const meta = await myCarServiceBookingQueryBuilder.countTotal();

  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "Data Not Found");
  }

  return {
    meta,
    result,
  };
};
export const CarServiceBookingService = {
  createServiceSlotBookingIntoDB: createCarServiceBookingIntoDB,
  getAllServiceSlotBookingFromDB: getAllCarServiceBookingFromDB,
  getAllMyServiceSlotBookingFromDB: getAllMyCarServiceBookingFromDB,
};
