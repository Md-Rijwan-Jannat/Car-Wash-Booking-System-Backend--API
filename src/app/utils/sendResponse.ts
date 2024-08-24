import { Response } from "express";

interface IMeta {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
}

export interface TSendResponseData<T> {
  statusCode: number;
  success: boolean;
  message: string;
  token?: string;
  data: T;
  meta?: IMeta;
}

const sendResponse = <T>(res: Response, data: TSendResponseData<T>) => {
  res.status(data.statusCode).json({
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    token: data.token,
    data: data.data,
  });
};

export const SendResponse = sendResponse;
