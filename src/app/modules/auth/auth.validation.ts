import { z } from "zod";

const userLoginValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Invalid email",
    }),
    password: z.string({ required_error: "Password is required" }),
  }),
});

const userChangePasswordValidationSchema = z.object({
  body: z.object({
    password: z.string({ required_error: "Password is required" }),
    newPassword: z.string({ required_error: "Password is required" }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh token is required",
      invalid_type_error: "Invalid refresh token",
    }),
  }),
});

export const UserAuthValidation = {
  userLoginValidationSchema,
  userChangePasswordValidationSchema,
  refreshTokenValidationSchema,
};
