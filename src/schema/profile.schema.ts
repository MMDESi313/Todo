import * as z from "zod";
import { usernameSchema } from "./register.schema";

export const updateProfileSchema = z.object({
  name: z.string().trim().min(1, { error: "نام نمیتواند خالی باشد" }),
  username: usernameSchema,
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
