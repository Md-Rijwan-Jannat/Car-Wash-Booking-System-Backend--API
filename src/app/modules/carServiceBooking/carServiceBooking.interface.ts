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
  service: Types.ObjectId;
  slot: Types.ObjectId;
  vehicleType: TVehicleType;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
}

export interface ICarServiceBookingPayload
  extends Omit<ICarServiceBooking, "service" | "slot"> {
  serviceId: string;
  slotId: string;
}
