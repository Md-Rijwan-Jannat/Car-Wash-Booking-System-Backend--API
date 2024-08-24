import { z } from "zod";

export const websiteReviewValidationSchema = z.object({
  body: z.object({
    user: z.string().optional(),
    feedback: z.string({ required_error: "Feedback is required" }).trim(),
    rating: z
      .number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot be more than 5"),
  }),
});
