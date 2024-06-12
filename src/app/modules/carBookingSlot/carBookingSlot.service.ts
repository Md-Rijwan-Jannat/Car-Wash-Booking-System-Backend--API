import { ICarBookingSlot } from "./carBookingSlot.interface";
import { CarBookingSlot } from "./carBookingSlot.model";

// ---> create car booking slot service
const createCrBookingSlotIntoDB = async (payload: ICarBookingSlot) => {
  console.log(payload);

  const result = await CarBookingSlot.create(payload);
  return null;
};

export const CarBookingSlotService = {
  createCrBookingSlotIntoDB,
};
