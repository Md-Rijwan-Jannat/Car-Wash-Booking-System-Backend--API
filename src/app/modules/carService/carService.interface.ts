/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface ICarService {
  name: string;
  image?: string;
  description: string;
  price: number;
  duration: number;
  isDeleted?: boolean;
}

export interface ICarServiceModel extends Model<ICarService> {
  isCarServiceExists(name: string): Promise<ICarService | null>;
}
