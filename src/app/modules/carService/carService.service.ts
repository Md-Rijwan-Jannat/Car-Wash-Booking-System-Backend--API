import { ICarService } from "./carService.interface";
import { CarService } from "./carService.model";

// ---> create car service service
const createCarServiceIntoDB = async (payload: ICarService) => {
  const result = await CarService.create(payload);
  return result;
};

// ---> get single car service service
const getSingleCarServiceFromDB = async (id: string) => {
  const result = await CarService.findById(id);
  return result;
};

// ---> get all car services service
const getAllCarServiceFromDB = async () => {
  const result = await CarService.find();
  return result;
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
  return result;
};

export const CarServiceServices = {
  createCarServiceIntoDB,
  getSingleCarServiceFromDB,
  getAllCarServiceFromDB,
  updateSingleCarServiceIntoDB,
  deleteSingleCarServiceIntoDB,
};
