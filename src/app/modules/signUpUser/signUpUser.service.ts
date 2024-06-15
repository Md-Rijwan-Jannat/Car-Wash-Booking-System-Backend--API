import { ISignUPUser } from "./signUpUser.interface";
import { SignUPUser } from "./signUpUser.model";

// ---> user signup service
const signUpUserAccountIntoDB = async (payload: ISignUPUser) => {
  const result = await SignUPUser.create(payload);
  return result;
};

export const SignUpServices = {
  signUpUserAccountIntoDB,
};
