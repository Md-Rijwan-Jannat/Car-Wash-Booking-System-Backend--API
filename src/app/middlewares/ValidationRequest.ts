import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { CatchAsync } from "../utils/catchAsync";

const validationRequest = (schema: AnyZodObject) => {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });
    next();
  });
};

export const ValidationRequest = validationRequest;
