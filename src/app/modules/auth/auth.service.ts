import httpStatus from "http-status";
import { AppError } from "../../error/AppError";
import { SignUPUser } from "../signUpUser/signUpUser.model";
import { IAuthChangePassword, IAuthLogin } from "./auth.interface";
import config from "../../config";
import { JwtValidation } from "./auth.utils";
import { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ---> user login service
const authLogin = async (payload: IAuthLogin) => {
  const user = await SignUPUser.isSignUpUserExisting(payload.email);
  const isUserExisting = await SignUPUser.find({ email: payload.email }).select(
    "-password",
  );

  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, "This user does not exist");
  }

  if (
    !(await SignUPUser.isSignUpUserPasswordMatch(
      payload.password,
      user.password,
    ))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, "Incorrect password");
  }

  const jwtPayload: { email: string; role: "admin" | "user" } = {
    email: user.email,
    role: user.role,
  };

  const createAccessToken = JwtValidation.createJwtToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_token_expire_in as string,
  );

  const createRefreshToken = JwtValidation.createJwtToken(
    jwtPayload,
    config.jwt_refresh_token as string,
    config.jwt_refresh_token_expire_in as string,
  );

  const accessToken = `Bearer ${createAccessToken}`;
  const refreshToken = `Bearer ${createRefreshToken}`;
  return {
    accessToken,
    refreshToken,
    userData: isUserExisting,
  };
};

// ---> password change service
const passwordChangeIntoDB = async (
  payload: IAuthChangePassword,
  requestedUserData: JwtPayload,
) => {
  const user = await SignUPUser.isSignUpUserExisting(requestedUserData.email);

  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, "This user does not exist");
  }

  if (
    !(await SignUPUser.isSignUpUserPasswordMatch(
      payload.password,
      user.password,
    ))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, "Incorrect password");
  }

  const newHashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_rounds_salt),
  );

  const result = await SignUPUser.findOneAndUpdate(
    {
      email: requestedUserData.email,
      role: requestedUserData.role,
    },
    {
      password: newHashPassword,
      passwordCreatedAt: new Date(),
    },
    { new: true },
  );

  return result;
};

// ---> refresh token service
const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_token as string,
  ) as JwtPayload;

  const { email, iat } = decoded;

  const user = await SignUPUser.isSignUpUserExisting(email);

  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, "This user does not exist");
  }

  const passwordChangeTimestamp =
    new Date(user.passwordCreatedAt as Date).getTime() / 1000;

  if (
    await SignUPUser.isJwtIssuedPasswordTimeChanged(
      iat as number,
      passwordChangeTimestamp,
    )
  ) {
    throw new AppError(httpStatus.FORBIDDEN, "You are not authorized!");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = JwtValidation.createJwtToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_token_expire_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthLoginService = {
  authLogin,
  passwordChangeIntoDB,
  refreshToken,
};
