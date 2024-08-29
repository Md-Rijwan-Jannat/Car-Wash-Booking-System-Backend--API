import { Types } from "mongoose";

export type IServiceSlot = "available" | "booked" | "canceled";
export interface ICarService {
  service: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: IServiceSlot;
}
