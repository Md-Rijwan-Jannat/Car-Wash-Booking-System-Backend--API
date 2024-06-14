import httpStatus from "http-status";
import { AppError } from "../../error/AppError";
import { SignUPUser } from "../signUpUser/signUpUser.model";
import { IAuthLogin } from "./auth.interface";
import config from "../../config";
import { JwtValidation } from "./auth.utils";

const authLogin = async (payload: IAuthLogin) => {
  const user = await SignUPUser.isSignUpUserExisting(payload.email);

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
  };
};

export const AuthLoginService = {
  authLogin,
};
