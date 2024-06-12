import { startSession } from "mongoose";
import { z } from "zod";

const createCarBookingSlotValidationSchema = z.object({
  body: z.object({
    service: z.string({
      required_error: "Service ID is required",
      invalid_type_error: "Service ID must be a string",
    }),
    date: z.string({
      required_error: "Date is required",
      invalid_type_error: "Date must be a string",
    }),
    startTime: z.string({
      required_error: "Start time is required",
      invalid_type_error: "Start time must be a string",
    }),
    endTime: z.string({
      required_error: "End time is required",
      invalid_type_error: "End time must be a string",
    }),
  }),
});

export const CarBookingSlotValidation = {
  createCarBookingSlotValidationSchema,
};
