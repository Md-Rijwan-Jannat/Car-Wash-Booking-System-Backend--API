import httpStatus from "http-status";
import { CatchAsync } from "../../utils/catchAsync";
import { SendResponse } from "../../utils/sendResponse";
import { CarServiceServices } from "./carService.service";

// ---> create car service controller
const createCarService = CatchAsync(async (req, res) => {
  const result = await CarServiceServices.createCarServiceIntoDB(req.body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service created successfully",
    data: result,
  });
});

// ---> get single car service controller
const getSingleCarService = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServiceServices.getSingleCarServiceFromDB(id);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service retrieved successfully",
    data: result,
  });
});

// ---> get all car service controller
const getAllCarService = CatchAsync(async (req, res) => {
  const result = await CarServiceServices.getAllCarServiceFromDB(req.query);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Services retrieved successfully",
    data: result,
  });
});

// ---> update single car service controller
const updateSingleCarService = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServiceServices.updateSingleCarServiceIntoDB(
    id,
    req.body,
  );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service updated successfully",
    data: result,
  });
});

// ---> delete single car service controller
const deleteSingleCarService = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServiceServices.deleteSingleCarServiceIntoDB(id);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service deleted successfully",
    data: result,
  });
});

export const CarServiceController = {
  createCarService,
  getSingleCarService,
  getAllCarService,
  updateSingleCarService,
  deleteSingleCarService,
};
