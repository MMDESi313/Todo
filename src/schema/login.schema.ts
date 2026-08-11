import * as z from "zod";

export const loginFormSchema = z.object({
  username: z.string().trim().min(1, { error: "نام کاربری را وارد کنید" }),
  password: z.string().min(1, { error: "رمز عبور را وارد کنید" }),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
