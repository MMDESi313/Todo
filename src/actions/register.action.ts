"use server";

import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { registerFormSchema } from "@/schema/register.schema";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

type RegisterResult =
  | { success: true }
  | {
      success: false;
      fieldErrors?: Partial<
        Record<"name" | "username" | "password" | "passwordRetype", string>
      >;
      formError?: string;
    };

export async function registerAction(input: unknown): Promise<RegisterResult> {
  const parsed = registerFormSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, formError: "اطلاعات وارد شده معتبر نیست" };
  }

  const { name, username, password } = parsed.data;

  let userId: string;
  try {
    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: { name, username, password: hashed },
    });
    userId = user.id;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        fieldErrors: { username: "این نام کاربری قبلاً انتخاب شده است" },
      };
    }
    return { success: false, formError: "خطایی پیش آمد، دوباره تلاش کنید" };
  }
  await createSession(userId);
  redirect("/");
}
