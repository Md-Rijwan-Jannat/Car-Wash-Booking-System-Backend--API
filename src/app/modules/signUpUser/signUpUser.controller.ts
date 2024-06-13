import httpStatus from "http-status";
import { CatchAsync } from "../../utils/catchAsync";
import { SendResponse } from "../../utils/sendResponse";
import { SignUpServices } from "./signUpUser.service";

const signUpUserAccount = CatchAsync(async (req, res) => {
  const result = await SignUpServices.signUpUserAccountIntoDB(req.body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully!",
    data: result,
  });
});

export const SignUpUserController = {
  signUpUserAccount,
};
