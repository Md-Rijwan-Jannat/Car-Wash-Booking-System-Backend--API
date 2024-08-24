import { Types } from "mongoose";

export interface IWebsiteReview {
  user: Types.ObjectId;
  feedback: string;
  rating: number;
}
