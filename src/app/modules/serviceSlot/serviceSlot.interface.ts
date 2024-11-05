import { Types } from "mongoose";

export type IServiceSlot = "available" | "booked" | "canceled" | "complete";
export interface ICarServiceSlot {
  _id?: string;
  service: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: IServiceSlot;
}
