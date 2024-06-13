import { Types } from "mongoose";

export type TVehicleType =
  | "car"
  | "truck"
  | "SUV"
  | "van"
  | "motorcycle"
  | "bus"
  | "electricVehicle"
  | "hybridVehicle"
  | "bicycle"
  | "tractor";

export interface ICarServiceBooking {
  customer?: Types.ObjectId;
  serviceId: Types.ObjectId;
  slotId: Types.ObjectId;
  vehicleType: TVehicleType;
  vehicleBrand: string;
  manufacturingYear: number;
  registrationPlate: string;
}
