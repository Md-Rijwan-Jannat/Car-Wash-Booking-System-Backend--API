import { model, Schema } from "mongoose";
import { IWebsiteReview } from "./websiteReview.interface";

export const websiteReviewSchema = new Schema<IWebsiteReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "SignUpUser",
    },
    feedback: {
      type: String,
      required: [true, "Feedback is required"],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const WebsiteReview = model<IWebsiteReview>(
  "WebsiteReview",
  websiteReviewSchema,
);
