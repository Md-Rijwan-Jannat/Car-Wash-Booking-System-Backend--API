import { Types } from "mongoose";

export interface ICarBookingSlot {
  service: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: "available" | "booked" | "canceled";
}
