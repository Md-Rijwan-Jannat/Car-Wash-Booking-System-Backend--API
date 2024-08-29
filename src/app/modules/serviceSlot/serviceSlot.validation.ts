import { z } from "zod";

const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;

const startTimeSchema = z
  .string({
    required_error: "Start time is required",
    invalid_type_error: "Start time should be 'HH:MM' format",
  })
  .refine((time) => {
    return timeRegex.test(time);
  });

const endTimeSchema = z
  .string({
    required_error: "End time is required",
    invalid_type_error: "End time should be 'HH:MM' format",
  })
  .refine((time) => {
    return timeRegex.test(time);
  });

const createServiceSlotsValidationSchema = z.object({
  body: z
    .object({
      service: z.string({
        required_error: "Service ID is required",
        invalid_type_error: "Service ID must be a string",
      }),
      date: z.string({
        required_error: "Date is required",
        invalid_type_error: "Date must be a string",
      }),
      startTime: startTimeSchema,
      endTime: endTimeSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return end > start;
      },
      {
        message: "Start time should be  before end time",
      },
    ),
});

const updateServiceSlotValidationSchema = z.object({
  body: z.object({
    isBooked: z.string({ required_error: "Booking status is required" }),
  }),
});

export const CarBookingSlotValidation = {
  createServiceSlotsValidationSchema,
  updateServiceSlotValidationSchema,
};
