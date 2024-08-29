import httpStatus from "http-status";
import { CatchAsync } from "../../utils/catchAsync";
import { SendResponse } from "../../utils/sendResponse";
import { CarBookingSlotService } from "./serviceSlot.service";

// ---> get all car booking slot controller
const createServiceSlot = CatchAsync(async (req, res) => {
  const result = await CarBookingSlotService.createServiceSlotIntoDB(req.body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slots created successfully",
    data: result,
  });
});

// ---> create car booking slot controller
const getAllAvailableServiceSlot = CatchAsync(async (req, res) => {
  const result = await CarBookingSlotService.getAllAvailableServiceSlotsFromDB(
    req.query,
  );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Available slots retrieved successfully",
    data: result,
  });
});

// ---> get single car booking slot controller
const getAllServiceSlotWithService = CatchAsync(async (req, res) => {
  const { id: serviceId } = req.params;
  const result =
    await CarBookingSlotService.getAllServiceSlotsFromDB(serviceId);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service with slots retrieved successfully",
    data: result,
  });
});

// ---> update car booking slot controller
const updateServiceSlotStatus = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarBookingSlotService.updateServiceSlotStatusFromDB(
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
  createServiceSlot: createServiceSlot,
  getAllAvailableServiceSlots: getAllAvailableServiceSlot,
  getAllServiceSlots: getAllServiceSlotWithService,
  updateServiceSlotStatus: updateServiceSlotStatus,
};
