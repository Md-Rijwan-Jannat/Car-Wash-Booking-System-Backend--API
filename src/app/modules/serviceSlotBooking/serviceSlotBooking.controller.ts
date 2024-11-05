import httpStatus from "http-status";
import { CatchAsync } from "../../utils/catchAsync";
import { SendResponse } from "../../utils/sendResponse";
import { CarServiceBookingService as ServiceSlotBookingService } from "./serviceSlotBooking.service";

// ---> car service booking controller
const createServiceSlotBooking = CatchAsync(async (req, res) => {
  const { email, role } = req.user;

  const { paymentSession, data } =
    await ServiceSlotBookingService.createServiceSlotBookingIntoDB(
      req.body,
      email,
      role,
    );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking successfully",
    data: { paymentSession, booking: data },
  });
});

// ---> get all car service booking controller
const getAllServiceSlotBooking = CatchAsync(async (req, res) => {
  const result = await ServiceSlotBookingService.getAllServiceSlotBookingFromDB(
    req.query,
  );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All bookings retrieved successfully",
    data: result,
  });
});

// ---> get all my car service booking controller
const getAllMyServiceSlotBooking = CatchAsync(async (req, res) => {
  const { email } = req.user;
  const result =
    await ServiceSlotBookingService.getAllMyServiceSlotBookingFromDB(
      req.query,
      email,
    );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User bookings retrieved successfully",
    data: result,
  });
});

export const ServiceSlotBookingController = {
  createServiceSlotBooking,
  getAllServiceSlotBooking,
  getAllMyServiceSlotBooking,
};
