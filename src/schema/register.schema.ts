import * as z from "zod";

export const passwordSchema = z
  .string()
  .trim()
  .min(1, {
    error: "رمز عبور نمیتواند خالی باشد",
  })
  .regex(/^[\x21-\x7E]+$/, {
    error: "رمز عبور فقط می‌تواند شامل حروف، اعداد و نویسه‌های انگلیسی باشد",
  })
  .min(8, {
    error: "رمز عبور نمیتواند کمتر از ۸ کاراکتر داشته باشد",
  });

export const usernameSchema = z
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
  });

export const registerFormSchema = z
  .object({
    name: z.string().trim().min(1, {
      error: "نام نمیتواند خالی باشد",
    }),
    username: usernameSchema,
    password: passwordSchema,
    passwordRetype: z.string().trim(),
  })
  .refine((data) => data.password === data.passwordRetype, {
    error: "رمز عبور و تکرار آن مطابقت ندارند",
    path: ["passwordRetype"],
  });

export type RegisterFormData = z.infer<typeof registerFormSchema>;
