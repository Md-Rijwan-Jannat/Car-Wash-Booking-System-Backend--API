import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validationRequest = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });
  };
};

export const ValidationRequest = validationRequest;
