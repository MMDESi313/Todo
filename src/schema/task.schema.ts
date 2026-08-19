import { startOfDay } from "date-fns";
import * as z from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { error: "عنوان نمی‌تواند خالی باشد" })
    .max(200, { error: "عنوان نمی‌تواند بیش از ۲۰۰ کاراکتر باشد" }),
  description: z
    .string()
    .trim()
    .max(2000, { error: "توضیحات نمی‌تواند بیش از ۲۰۰۰ کاراکتر باشد" })
    .optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  dueAt: z.date().refine((date) => startOfDay(date) >= startOfDay(new Date()), {
    error: "تاریخ نمی‌تواند در گذشته باشد",
  }),
  tagIds: z.array(z.string()),
});

export type TaskFormData = z.infer<typeof taskSchema>;
