import z from "zod";

export const artistPriceFormSchema = z.object({
  price: z.coerce
    .string()
    .regex(/^\d+$/, "Duration must be a number in minutes")
    .transform((val) => parseInt(val, 10)),
});

// TypeScript type for form
export type ServiceForm = z.infer<typeof artistPriceFormSchema>;
