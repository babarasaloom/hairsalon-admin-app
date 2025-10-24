import { z } from "zod";

// Service form schema
export const serviceFormSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  description: z.string().optional(),
  duration: z.coerce
    .string()
    .regex(/^\d+$/, "Duration must be a number in minutes")
    .transform((val) => parseInt(val, 10)),
  imageUrl: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  isActive: z.coerce
    .string()
    .transform((val) => val === "true" || val === "on")
    .optional(),
});

// TypeScript type for form
export type ServiceForm = z.infer<typeof serviceFormSchema>;
