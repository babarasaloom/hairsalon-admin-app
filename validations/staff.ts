import { z } from "zod";

export const staffFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email().min(2, "Email is required"),
  role: z.string().min(2, "Role is required"),
  contactNumber: z.string().min(5, "Phone number is required"),
  bio: z.string().max(2000).optional(),
  avatarUrl: z.string().optional(),
  isActive: z.coerce
    .string()
    .transform((val) => val === "true" || val === "on")
    .optional(),
});
