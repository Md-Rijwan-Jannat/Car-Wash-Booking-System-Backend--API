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

export const SignUpServices = {
  signUpUserAccountIntoDB,
};
