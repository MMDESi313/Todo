"use server";

import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { editProfileSchema } from "@/schema/profile.schema";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

type EditProfileResult =
  | { success: true }
  | {
      success: false;
      fieldErrors?: Partial<Record<"name" | "username", string>>;
      formError?: string;
    };

export async function editProfileAction(
  input: unknown,
): Promise<EditProfileResult> {
  const parsed = editProfileSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, formError: "اطلاعات وارد‌شده معتبر نیست" };
  }

  const user = await getCurrentUser();
  if (!user) {
    return { success: false, formError: "ابتدا وارد حساب خود شوید" };
  }

  const { name, username } = parsed.data;

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: { name, username },
    });
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
    throw error;
  }

  revalidatePath("/profile");
  return { success: true };
}
