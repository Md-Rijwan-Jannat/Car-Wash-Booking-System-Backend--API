/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from "express";
import httpStatus from "http-status";

const notFound: RequestHandler = (req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    error: "",
  });
};

export const NotFound = notFound;
