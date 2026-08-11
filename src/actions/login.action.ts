"use server";

import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { loginFormSchema } from "@/schema/login.schema";
import { redirect } from "next/navigation";

type LoginResult = { success: true } | { success: false; formError?: string };

export async function loginAction(input: unknown): Promise<LoginResult> {
  const parsed = loginFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      formError: "اطلاعات وارد‌شده معتبر نیست",
    };
  }

  const { username, password } = parsed.data;

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return { success: false, formError: "نام کاربری یا رمز عبور اشتباه است" };
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return { success: false, formError: "نام کاربری یا رمز عبور اشتباه است" };
    }

    await createSession(user.id);
  } catch {
    return { success: false, formError: "خطایی پیش آمد، دوباره تلاش کنید" };
  }

  redirect("/");
}
