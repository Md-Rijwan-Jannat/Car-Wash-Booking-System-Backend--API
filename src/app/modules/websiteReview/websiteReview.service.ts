import httpStatus from "http-status";
import { AppError } from "../../error/AppError";
import { SignUPUser } from "../signUpUser/signUpUser.model";
import { IWebsiteReview } from "./websiteReview.interface";
import { WebsiteReview } from "./websiteReview.model";
import QueryBuilder from "../../builder/QueryBuilder";

const createWebsiteReviewInToDB = async (
  payload: IWebsiteReview,
  email: string,
) => {
  const user = await SignUPUser.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const result = await WebsiteReview.create({ ...payload, user: user._id });

  return result;
};

const getAllWebsiteReviewFromDB = async (query: Record<string, unknown>) => {
  const websiteReviewQueryBuilder = new QueryBuilder(
    WebsiteReview.find().populate("user"),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await websiteReviewQueryBuilder.modelQuery;
  const meta = await websiteReviewQueryBuilder.countTotal();

  return {
    meta,
    result,
  };
};

export const WebsiteReviewServices = {
  createWebsiteReviewInToDB,
  getAllWebsiteReviewFromDB,
};
