import httpStatus from "http-status";
import { CatchAsync } from "../../utils/catchAsync";
import { SendResponse } from "../../utils/sendResponse";
import { WebsiteReviewServices } from "./websiteReview.service";

const createWebsiteReview = CatchAsync(async (req, res) => {
  const { email } = req.user;
  console.log("=>", email);
  const result = await WebsiteReviewServices.createWebsiteReviewInToDB(
    req.body,
    email,
  );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Feedback send successfully",
    data: result,
  });
});

const getAllWebsiteReview = CatchAsync(async (req, res) => {
  const result = await WebsiteReviewServices.getAllWebsiteReviewFromDB(
    req.query,
  );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Feedbacks retrieved successfully",
    data: result,
  });
});

export const WebsiteReviewController = {
  createWebsiteReview,
  getAllWebsiteReview,
};
