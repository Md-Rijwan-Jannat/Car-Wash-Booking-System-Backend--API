import { Model } from "mongoose";
import { USER_ROLE } from "./signUpUser.constants";

export interface ISignUPUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user";
  address: string;
}

export type TUserRole = keyof typeof USER_ROLE;

// statics methods
export interface ISignUpUserModel extends Model<ISignUPUser> {
  isSignUpUserExisting(email: string): Promise<ISignUPUser | null>;
  isSignUpUserPasswordMatch(
    resendLoginPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
}
