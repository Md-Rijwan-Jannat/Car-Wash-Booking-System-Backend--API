import httpStatus from "http-status";
import mongoose from "mongoose";
import { AppError } from "../../error/AppError";
import { CarService } from "../carService/carService.model";
import { ServiceSlot } from "../serviceSlot/serviceSlot.model";
import { SignUPUser } from "../signUpUser/signUpUser.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { initialPayment } from "../paymanet/payment.utils";
import { ServiceSlotBooking } from "./serviceSlotBooking.model";
import { IServiceSlotBookingPayload } from "./serviceSlotBooking.interface";
import { ServiceSlotBookingSearchableFields } from "./serviceSlotBooking.constants";
import { generateTransactionId } from "../../utils/generateTransitionId";

// Create car booking service with transaction
const createServiceSlotBookingIntoDB = async (
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

    // Check if all slots in the array are available
    const slotsToBook = await ServiceSlot.find({
      _id: { $in: payload.slotId },
      isBooked: "available",
    }).session(session);

    if (slotsToBook.length === 0) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Sorry, Right now service slots are not available",
      );
    }

    // Update all slots to booked
    const isUpdate = await ServiceSlot.updateMany(
      { _id: { $in: payload.slotId } },
      { isBooked: "booked" },
      { session, new: true, runValidators: true },
    );

    if (!isUpdate) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Sorry, Right now service slots are not available",
      );
    }
    const generateTransitionId = generateTransactionId();

    // Create the car service booking
    const result = await ServiceSlotBooking.create(
      [
        {
          customer: customer._id,
          service: payload.serviceId,
          slot: payload.slotId,
          transitionId: generateTransitionId,
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          address: payload.address,
          totalPrice: payload.totalPrice,
          vehicleType: payload.vehicleType,
          vehicleBrand: payload.vehicleBrand,
          vehicleModel: payload.vehicleModel,
          manufacturingYear: payload.manufacturingYear,
          registrationPlate: payload.registrationPlate,
        },
      ],
      { session },
    );

    // Populate the result with related data
    const populatedResult = await ServiceSlotBooking.findById(result[0]._id)
      .populate("customer")
      .populate("service")
      .populate("slot")
      .session(session);

    // Payment processing
    const paymentData = {
      transitionId: result[0].transitionId,
      amount: payload.totalPrice,
      customerEmail: customer.email,
      customerName: customer.name,
      customerNumber: customer.phone,
      customerAddress: customer.address,
    };

    const paymentSession = await initialPayment(paymentData);

    console.log(paymentSession);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return { paymentSession, data: populatedResult };
  } catch (error) {
    // Abort the transaction in case of an error
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// ---> get all car service booking data
const getAllServiceSlotBookingFromDB = async (
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
const getAllMyServiceSlotBookingFromDB = async (
  query: Record<string, unknown>,
  email: string,
) => {
  const isUserExisting = await SignUPUser.findOne({ email });

  console.log(isUserExisting, email);

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
  createServiceSlotBookingIntoDB,
  getAllServiceSlotBookingFromDB,
  getAllMyServiceSlotBookingFromDB,
};
