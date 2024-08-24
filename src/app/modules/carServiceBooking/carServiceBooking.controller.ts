import httpStatus from "http-status";
import { CatchAsync } from "../../utils/catchAsync";
import { SendResponse } from "../../utils/sendResponse";
import { CarServiceBookingService } from "./carServiceBooking.service";

// ---> car service booking controller
const createCarServiceBooking = CatchAsync(async (req, res) => {
  const { email } = req.user;

  const result = await CarServiceBookingService.createCarServiceBookingIntoDB(
    req.body,
    email,
  );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking successful",
    data: result,
  });
});

// ---> get all car service booking controller
const getAllCarServiceBooking = CatchAsync(async (req, res) => {
  const result = await CarServiceBookingService.getAllCarServiceBookingFromDB(
    req.query,
  );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All bookings retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

// ---> get all my car service booking controller
const getAllMyCarServiceBooking = CatchAsync(async (req, res) => {
  const result = await CarServiceBookingService.getAllMyCarServiceBookingFromDB(
    req.user,
    req.query,
  );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User bookings retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

export const CarServiceBookingController = {
  createCarServiceBooking,
  getAllCarServiceBooking,
  getAllMyCarServiceBooking,
};
