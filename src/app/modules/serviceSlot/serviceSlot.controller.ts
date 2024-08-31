import httpStatus from "http-status";
import { CatchAsync } from "../../utils/catchAsync";
import { SendResponse } from "../../utils/sendResponse";
import { ServicesSlotsService } from "./serviceSlot.service";

// ---> get all car booking slot controller
const createServiceSlot = CatchAsync(async (req, res) => {
  const result = await ServicesSlotsService.createServiceSlotIntoDB(req.body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slots created successfully",
    data: result,
  });
});

// ---> create car booking slot controller
const getAllAvailableServiceSlots = CatchAsync(async (req, res) => {
  const result = await ServicesSlotsService.getAllAvailableServiceSlotsFromDB(
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
const getServiceAllSlots = CatchAsync(async (req, res) => {
  const { id: serviceId } = req.params;
  const result =
    await ServicesSlotsService.getAllServiceAllSlotsFromDB(serviceId);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service with slots retrieved successfully",
    data: result,
  });
});

// ---> get all car services slots controller
const getAllServiceSlots = CatchAsync(async (req, res) => {
  const result = await ServicesSlotsService.getAllServicesSlotsFromDB(
    req.query,
  );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All services slots are retrieved successfully",
    data: result,
  });
});

// ---> update car booking slot controller
const updateServiceSlotStatus = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServicesSlotsService.updateServiceSlotStatusFromDB(
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

export const ServicesSlotsController = {
  createServiceSlot,
  getAllAvailableServiceSlots,
  getServiceAllSlots,
  getAllServiceSlots,
  updateServiceSlotStatus,
};
