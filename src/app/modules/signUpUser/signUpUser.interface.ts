/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./signUpUser.constants";

export interface ISignUPUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  profileImg?: string;
  role: "admin" | "user";
  address: string;
  passwordCreatedAt?: Date;
}

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

// statics methods
export interface ISignUpUserModel extends Model<ISignUPUser> {
  isSignUpUserExisting(email: string): Promise<ISignUPUser | null>;
  isSignUpUserPasswordMatch(
    resendLoginPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
  isJwtIssuedPasswordTimeChanged(
    jwtIssuedTimestamp: number,
    passwordChangeTimestamp: number,
  ): Promise<boolean>;
}
