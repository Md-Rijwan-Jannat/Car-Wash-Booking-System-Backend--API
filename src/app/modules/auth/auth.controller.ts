import httpStatus from "http-status";
import { CatchAsync } from "../../utils/catchAsync";
import { SendResponse } from "../../utils/sendResponse";
import { AuthLoginService } from "./auth.service";
import config from "../../config";

// ---> user login controller
const authLogin = CatchAsync(async (req, res) => {
  const result = await AuthLoginService.authLogin(req.body);

  const { accessToken, refreshToken, user } = result;

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.node_dev === "production",
  });

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    token: accessToken,
    data: user,
  });
});

// ---> password change controller
const passwordChange = CatchAsync(async (req, res) => {
  const result = await AuthLoginService.passwordChangeIntoDB(
    req.body,
    req.user,
  );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password changed successfully",
    data: result,
  });
});

// ---> refresh token controller
const refreshToken = CatchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const token = refreshToken.replace("Bearer ", "");
  const result = await AuthLoginService.refreshToken(token);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Refresh token retrieved successfully",
    data: result,
  });
});

export const AuthLoginController = {
  authLogin,
  passwordChange,
  refreshToken,
};
