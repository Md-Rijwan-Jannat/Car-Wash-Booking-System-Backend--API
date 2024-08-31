import httpStatus from "http-status";
import { AppError } from "../../error/AppError";
import { ISignUPUser } from "./signUpUser.interface";
import { SignUPUser } from "./signUpUser.model";
import QueryBuilder from "../../builder/QueryBuilder";

// ---> user signup service
const signUpUserAccountIntoDB = async (payload: ISignUPUser) => {
  const user = await SignUPUser.isSignUpUserExisting(payload.email);

  if (user) {
    throw new AppError(httpStatus.CONFLICT, "This user already exists");
  }
  const result = await SignUPUser.create(payload);
  return result;
};

// ---> getAllUserFromDB service
const getAllUserFromDB = async (query: Record<string, unknown>) => {
  const getAllUserQueryBuilder = new QueryBuilder(
    SignUPUser.find({ role: "user" }),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await getAllUserQueryBuilder.modelQuery;
  const meta = await getAllUserQueryBuilder.countTotal();

  return {
    meta,
    result,
  };
};

// ---> getAllAdminFromDB service
const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  const getAllUserQueryBuilder = new QueryBuilder(
    SignUPUser.find({ role: "admin" }),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await getAllUserQueryBuilder.modelQuery;
  const meta = await getAllUserQueryBuilder.countTotal();

  return {
    meta,
    result,
  };
};

// ---> get user service
const getUserFromDB = async (userEmail: string, email: string) => {
  const result = await SignUPUser.findOne({ email: userEmail });

  if (email !== result?.email) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are unauthorized");
  }

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return result;
};

// ---> update user details service
const updateUserAccountIntoDB = async (
  payload: Partial<ISignUPUser>,
  userId: string,
) => {
  const user = await SignUPUser.findById({ _id: userId });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const result = await SignUPUser.findByIdAndUpdate({ _id: userId }, payload, {
    new: true,
  });

  return result;
};

export const SignUpServices = {
  signUpUserAccountIntoDB,
  getAllUserFromDB,
  getAllAdminFromDB,
  getUserFromDB,
  updateUserAccountIntoDB,
};
