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
  service: Types.ObjectId[];
  slot: Types.ObjectId[];
  name: string;
  email: string;
  phone: string;
  address: string;
  transitionId: string;
  paymentStatus: "Pending" | "Paid" | "Failed";
  totalPrice: number;
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
