import { z } from "zod";
import { vehicleTypeArray } from "./serviceSlotBooking.constants";

const createServiceSlotBookingValidationSchema = z.object({
  body: z.object({
    customer: z
      .string({ invalid_type_error: "Customer ID must be a string" })
      .optional(),
    serviceId: z
      .array(
        z
          .string({
            required_error: "Service ID is required",
            invalid_type_error: "Service ID must be a string",
          })
          .trim(),
      )
      .nonempty({
        message: "service ID array cannot be empty",
      }),
    slotId: z
      .array(
        z
          .string({
            required_error: "Each Slot ID is required",
            invalid_type_error: "Each Slot ID must be a string",
          })
          .trim(),
      )
      .nonempty({
        message: "Slot ID array cannot be empty",
      }),
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name is must be a string",
    }),
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email is must be a string",
    }),
    phone: z.string({
      required_error: "Phone is required",
      invalid_type_error: "Phone is must be a string",
    }),
    address: z.string({
      required_error: "Address is required",
      invalid_type_error: "Address is must be a string",
    }),
    vehicleType: z.enum([...(vehicleTypeArray as [string, ...string[]])], {
      required_error: "Vehicle Type is required",
      invalid_type_error: "Invalid Vehicle Type",
    }),
    transitionId: z
      .string({
        required_error: "Transition ID is required",
        invalid_type_error: "Transition ID must be a string",
      })
      .trim()
      .optional(),
    totalPrice: z
      .string({
        required_error: "Total price is required",
        invalid_type_error: "Total price must be a string",
      })
      .trim(),
    paymentStatus: z
      .enum([...(["Pending", "Paid", "Failed"] as [string, ...string[]])], {
        required_error: "Vehicle Type is required",
        invalid_type_error: "Invalid Vehicle Type",
      })
      .optional(),
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
