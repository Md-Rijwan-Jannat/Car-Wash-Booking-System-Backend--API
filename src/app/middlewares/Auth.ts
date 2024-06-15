import jwt, { JwtPayload } from "jsonwebtoken";
import { CatchAsync } from "../utils/catchAsync";
import { AppError } from "../error/AppError";
import httpStatus from "http-status";
import config from "../config";
import { SignUPUser } from "../modules/signUpUser/signUpUser.model";
import { TUserRole } from "../modules/signUpUser/signUpUser.interface";

const auth = (...requiredUserRole: TUserRole[]) => {
  return CatchAsync(async (req, res, next) => {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_token as string,
    ) as JwtPayload;

    const { email, role, iat } = decoded;

    const user = await SignUPUser.findOne({ email });

    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }

    const passwordChangeTimestamp =
      new Date(user.passwordCreatedAt as Date).getTime() / 1000;

    if (
      user?.passwordCreatedAt &&
      (await SignUPUser.isJwtIssuedPasswordTimeChanged(
        iat as number,
        passwordChangeTimestamp,
      ))
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    if (requiredUserRole && !requiredUserRole.includes(role)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You have no access to this route",
      );
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export const Auth = auth;
