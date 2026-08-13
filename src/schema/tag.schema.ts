import * as z from "zod";

export const tagSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: "نام برچسب نمیتواند خالی باشد" })
    .transform((val) => val.toLowerCase()),
  color: z.number().int().min(1).max(10),
});

export type TagFormData = z.infer<typeof tagSchema>;
