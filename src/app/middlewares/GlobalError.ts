/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from "express";
import { TErrorMessages } from "../interface/error.interface";
import config from "../config";
import { ZodError } from "zod";
import { ZodErrorHandler } from "../error/zodErrorHandler";
import { MongooseErrorHandler } from "../error/mongooseErrorHandler ";
import { DuplicateErrorHandler } from "../error/duplicateErrorHandler";
import { CastErrorHandler } from "../error/castErrorHandler";
import { AppError } from "../error/AppError";

const globalError: ErrorRequestHandler = (err, req, res, next) => {
  // console.log(err);

  let statusCode: number = 500;
  let message = err.message || "Internal server error";

  let errorMessages: TErrorMessages = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = ZodErrorHandler(err);
    (statusCode = simplifiedError?.statusCode),
      (message = simplifiedError?.message),
      (errorMessages = simplifiedError?.errorMessages);
  } else if (err?.name === "ValidationError") {
    const simplifiedError = MongooseErrorHandler(err);
    (statusCode = simplifiedError?.statusCode),
      (message = simplifiedError?.message),
      (errorMessages = simplifiedError?.errorMessages);
  } else if (err?.name === "CastError") {
    const simplifiedError = CastErrorHandler(err);
    (statusCode = simplifiedError?.statusCode),
      (message = simplifiedError?.message),
      (errorMessages = simplifiedError?.errorMessages);
  } else if (err?.code === 11000) {
    const simplifiedError = DuplicateErrorHandler(err);
    (statusCode = simplifiedError?.statusCode),
      (message = simplifiedError?.message),
      (errorMessages = simplifiedError?.errorMessages);
  } else if (err instanceof AppError) {
    (statusCode = err.statusCode),
      (message = err.message),
      (errorMessages = [
        {
          path: "",
          message: err.message,
        },
      ]);
  } else if (err instanceof Error) {
    (message = err.message),
      (errorMessages = [
        {
          path: "",
          message: err.message,
        },
      ]);
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    errorMessages,
    stack: config.node_dev === "development" ? err.stack : null,
  });
};

export const GlobalError = globalError;
