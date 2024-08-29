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
  | "tractor"
  | "other";

export interface IServiceSlotBooking {
  customer?: Types.ObjectId;
  service: Types.ObjectId;
  slot: Types.ObjectId;
  transitionId: string;
  paymentStatus: "pending" | "success";
  vehicleType: TVehicleType;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
}

export interface IServiceSlotBookingPayload
  extends Omit<IServiceSlotBooking, "service" | "slot"> {
  serviceId: string;
  slotId: string;
}
