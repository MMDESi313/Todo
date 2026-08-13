"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { changePasswordSchema } from "@/schema/changePassword.schema";

type ChangePasswordResult =
  | { success: true }
  | {
      success: false;
      fieldErrors?: Partial<
        Record<"currentPassword" | "newPassword" | "newPasswordRetype", string>
      >;
      formError?: string;
    };

export async function changePasswordAction(
  input: unknown,
): Promise<ChangePasswordResult> {
  const parsed = changePasswordSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, formError: "اطلاعات وارد‌شده معتبر نیست" };
  }

  const user = await getCurrentUser();
  if (!user) {
    return { success: false, formError: "ابتدا وارد حساب خود شوید" };
  }

  const { currentPassword, newPassword } = parsed.data;

  const isValid = await verifyPassword(currentPassword, user.password);
  if (!isValid) {
    return {
      success: false,
      fieldErrors: { currentPassword: "رمز عبور فعلی اشتباه است" },
    };
  }

  const hashed = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashed },
  });

  return { success: true };
}
