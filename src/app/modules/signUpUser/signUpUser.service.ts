import httpStatus from "http-status";
import { AppError } from "../../error/AppError";
import { ISignUPUser } from "./signUpUser.interface";
import { SignUPUser } from "./signUpUser.model";

// ---> user signup service
const signUpUserAccountIntoDB = async (payload: ISignUPUser) => {
  const user = await SignUPUser.isSignUpUserExisting(payload.email);

  if (user) {
    throw new Error("This user already exists");
  }
  const result = await SignUPUser.create(payload);
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
  const result = await SignUPUser.findByIdAndUpdate({ _id: userId }, payload);

  return result;
};

export const SignUpServices = {
  signUpUserAccountIntoDB,
  updateUserAccountIntoDB,
};
