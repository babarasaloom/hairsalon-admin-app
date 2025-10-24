import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  isPublished: z.coerce.boolean().default(true),
  imageUrl: z.string().optional(),
});

export type CategoryForm = z.infer<typeof categoryFormSchema>;
