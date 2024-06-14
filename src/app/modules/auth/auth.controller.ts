import httpStatus from "http-status";
import { CatchAsync } from "../../utils/catchAsync";
import { SendResponse } from "../../utils/sendResponse";
import { AuthLoginService } from "./auth.service";
import config from "../../config";

const authLogin = CatchAsync(async (req, res) => {
  const result = await AuthLoginService.authLogin(req.body);

  const { accessToken, refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.node_dev === "production",
  });

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      accessToken,
    },
  });
});

export const AuthLoginController = {
  authLogin,
};
