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

export const CarBookingSlotController = {
  createCarBookingSlot,
};
