import { z } from "zod";

const passwordValidationSchema = z
  .string({ invalid_type_error: "Password must be string" })
  .min(8)
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  );

const userLoginValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Invalid email",
    }),
    password: passwordValidationSchema,
  }),
});

export const UserLoginValidation = {
  userLoginValidationSchema,
};
