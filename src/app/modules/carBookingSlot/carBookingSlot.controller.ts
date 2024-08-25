import httpStatus from "http-status";
import { CatchAsync } from "../../utils/catchAsync";
import { SendResponse } from "../../utils/sendResponse";
import { CarBookingSlotService } from "./carBookingSlot.service";

// ---> create car booking slot controller
const createCarBookingSlot = CatchAsync(async (req, res) => {
  const result = await CarBookingSlotService.createCrBookingSlotIntoDB(
    req.body,
  );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slots created successfully",
    data: result,
  });
});

// ---> create car booking slot controller
const getAllAvailableCarBookingSlot = CatchAsync(async (req, res) => {
  const result =
    await CarBookingSlotService.getAllAvailableCarBookingSlotsFromDB(req.query);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Available slots retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

// ---> update car booking slot controller
const updateCarBookingStatus = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarBookingSlotService.updateCarBookingStatusFromDB(
    req.body,
    id,
  );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Update car booking slots successfully",
    data: result,
  });
});

export const CarBookingSlotController = {
  createCarBookingSlot,
  getAllAvailableCarBookingSlot,
  updateCarBookingStatus,
};
