import * as z from "zod";
import { passwordSchema } from "./register.schema";

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .trim()
      .min(1, { error: "رمز عبور فعلی را وارد کنید" }),
    newPassword: passwordSchema,
    newPasswordRetype: z.string().trim(),
  })
  .refine((data) => data.newPassword === data.newPasswordRetype, {
    error: "رمز عبور جدید و تکرار آن مطابقت ندارند",
    path: ["newPasswordRetype"],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
