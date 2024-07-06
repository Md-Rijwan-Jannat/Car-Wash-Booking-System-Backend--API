import { z } from "zod";

const passwordSchema = z
  .string({
    required_error: "Password is required",
    invalid_type_error: "Password must be string",
  })
  .min(8)
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  );

const createSignUpValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name is must be a string",
    }),
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email is must be a string",
    }),
    password: passwordSchema,
    phone: z.string({
      required_error: "Phone is required",
      invalid_type_error: "Phone is must be a string",
    }),
    role: z.string({
      required_error: "Role is required",
      invalid_type_error: "Role is must be a string",
    }),
    address: z.string({
      required_error: "Address is required",
      invalid_type_error: "Address is must be a string",
    }),
  }),
});

const updateSignUpValidationSchema = z.object({
  body: createSignUpValidationSchema.partial(),
});

export const SignUpValidation = {
  createSignUpValidationSchema,
  updateSignUpValidationSchema,
};
