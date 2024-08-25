import { Types } from "mongoose";

export type IBookingStatus = "available" | "booked" | "canceled";
export interface ICarBookingSlot {
  service: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: IBookingStatus;
}
