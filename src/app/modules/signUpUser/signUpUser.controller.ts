import httpStatus from "http-status";
import { CatchAsync } from "../../utils/catchAsync";
import { SendResponse } from "../../utils/sendResponse";
import { SignUpServices } from "./signUpUser.service";

// ---> Signup a new user controller
const signUpUserAccount = CatchAsync(async (req, res) => {
  const result = await SignUpServices.signUpUserAccountIntoDB(req.body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully!",
    data: result,
  });
});

// ---> getAllUser  controller
const getAllUser = CatchAsync(async (req, res) => {
  const result = await SignUpServices.getAllUserFromDB(req.query);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get all users retrieved successfully!",
    data: result,
  });
});
// ---> getAllAdmin  controller
const getAllAdmin = CatchAsync(async (req, res) => {
  const result = await SignUpServices.getAllAdminFromDB(req.query);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get all users retrieved successfully!",
    data: result,
  });
});

// ---> getUser  controller
const getUser = CatchAsync(async (req, res) => {
  const { email } = req.user;
  const { email: userEmail } = req.params;
  const result = await SignUpServices.getUserFromDB(userEmail, email);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get user successfully!",
    data: result,
  });
});

// ---> Update user details controller
const updateUserAccount = CatchAsync(async (req, res) => {
  const { id: userId } = req.params;
  const result = await SignUpServices.updateUserAccountIntoDB(
    req.body,
    userId as string,
  );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Update data successfully!",
    data: result,
  });
});

export const SignUpUserController = {
  signUpUserAccount,
  getAllUser,
  getAllAdmin,
  getUser,
  updateUserAccount,
};
