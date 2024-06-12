import { NextFunction, Request, Response } from "express";

const globalError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode: number = 500;
  const message = err.message || "Internal server error";

  return res.status(statusCode).json({
    status: statusCode,
    success: false,
    message: message,
  });
};

export const GlobalError = globalError;
