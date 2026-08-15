import * as z from "zod";

export const tagSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: "نام برچسب نمیتواند خالی باشد" })
    .max(25, { error: "نام برچسب نمیتواند بیش از ۲۵ کاراکتر باشد" })
    .transform((val) => val.toLowerCase()),
  color: z
    .number()
    .int()
    .min(1, { error: "یکی از حالت‌های موجود باید انتخاب شود" })
    .max(10, { error: "یکی از حالت‌های موجود باید انتخاب شود" }),
});

export type TagFormData = z.infer<typeof tagSchema>;
