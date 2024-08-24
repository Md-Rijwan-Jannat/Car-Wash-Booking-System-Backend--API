import httpStatus from "http-status";
import { AppError } from "../../error/AppError";
import { ICarService } from "./carService.interface";
import { CarService } from "./carService.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { CarServiceSearchableFields } from "./carService.constants";

// ---> create car service service
const createCarServiceIntoDB = async (payload: ICarService) => {
  const carService = await CarService.isCarServiceExists(payload.name);
  if (carService) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This car service already exists",
    );
  }
  const result = await CarService.create(payload);
  return result;
};

// ---> get single car service service
const getSingleCarServiceFromDB = async (id: string) => {
  const result = await CarService.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Data Not Found");
  }

  return result;
};

// ---> get all car services service
const getAllCarServiceFromDB = async (query: Record<string, unknown>) => {
  const carServiceQueryBuilder = new QueryBuilder(CarService.find(), query)
    .search(CarServiceSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await carServiceQueryBuilder.modelQuery;

  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "Data Not Found");
  }

  const meta = await carServiceQueryBuilder.countTotal();

  return {
    meta,
    result,
  };
};

// ---> update single car service service
const updateSingleCarServiceIntoDB = async (
  id: string,
  payload: Partial<ICarService>,
) => {
  const result = await CarService.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Data Not Found");
  }

  return result;
};

// ---> delete single car service service
const deleteSingleCarServiceIntoDB = async (id: string) => {
  const result = await CarService.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Data Not Found");
  }

  return result;
};

export const CarServiceServices = {
  createCarServiceIntoDB,
  getSingleCarServiceFromDB,
  getAllCarServiceFromDB,
  updateSingleCarServiceIntoDB,
  deleteSingleCarServiceIntoDB,
};
