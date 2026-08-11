import * as z from "zod";
import { passwordSchema } from "./register.schema";

export const loginFormSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, {
      error: "نام کاربری نمیتواند خالی باشد",
    })
    .regex(/^[A-Za-z0-9]+$/, {
      error: "نام کاربری باید فقط شامل حروف انگلیسی و اعداد باشد",
    })
    .min(5, {
      error: "نام کاربری نمیتواند کمتر از ۵ کاراکتر داشته باشد",
    }),
  password: passwordSchema,
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
