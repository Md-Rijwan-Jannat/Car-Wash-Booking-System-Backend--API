import { ErrorRequestHandler } from "express";

const globalError: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);

  const statusCode: number = 500;
  const message = err.message || "Internal server error";

  return res.status(statusCode).json({
    status: statusCode,
    success: false,
    message: message,
    err,
  });
};

export const GlobalError = globalError;
