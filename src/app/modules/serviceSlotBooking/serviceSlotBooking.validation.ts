import { z } from "zod";
import { vehicleTypeArray } from "./serviceSlotBooking.constants";

const createServiceSlotBookingValidationSchema = z.object({
  body: z.object({
    customer: z
      .string({ invalid_type_error: "Customer ID must be a string" })
      .optional(),
    serviceId: z
      .string({
        required_error: "Service ID is required",
        invalid_type_error: "Service ID must be a string",
      })
      .trim(),
    slotId: z
      .string({
        required_error: "Slot ID is required",
        invalid_type_error: "Slot ID must be a string",
      })
      .trim(),
    vehicleType: z.enum([...(vehicleTypeArray as [string, ...string[]])], {
      required_error: "Vehicle Type is required",
      invalid_type_error: "Invalid Vehicle Type",
    }),
    transitionId: z
      .string({
        required_error: "Transition ID is required",
        invalid_type_error: "Transition ID must be a string",
      })
      .trim(),
    paymentStatus: z.enum(
      [...(["pending", "success"] as [string, ...string[]])],
      {
        required_error: "Vehicle Type is required",
        invalid_type_error: "Invalid Vehicle Type",
      },
    ),
    vehicleBrand: z
      .string({
        required_error: "Vehicle brand is required",
        invalid_type_error: "Vehicle brand must be a string",
      })
      .trim(),
    vehicleModel: z
      .string({
        required_error: "Vehicle model is required",
        invalid_type_error: "Vehicle model must be a string",
      })
      .trim(),
    manufacturingYear: z.number({
      required_error: "Manufacturing year is required",
      invalid_type_error: "Manufacturing year must be a number",
    }),
    registrationPlate: z
      .string({
        required_error: "Registration plate is required",
        invalid_type_error: "Registration plate must be a string",
      })
      .trim(),
  }),
});

const updateServiceSlotBookingValidationSchema = z.object({
  body: createServiceSlotBookingValidationSchema.partial(),
});

export const ServiceSlotBookingValidation = {
  createServiceSlotBookingValidationSchema,
  updateServiceSlotBookingValidationSchema,
};
