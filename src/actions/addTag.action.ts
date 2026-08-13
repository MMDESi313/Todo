"use server";

import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { tagSchema } from "@/schema/tag.schema";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

type AddTagResult =
  | { success: true }
  | {
      success: false;
      fieldErrors?: Partial<Record<"name" | "color", string>>;
      formError?: string;
    };

export async function addTagAction(input: unknown): Promise<AddTagResult> {
  const parsed = tagSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      formError: "اطلاعات وارد‌شده معتبر نیست",
    };
  }

  const user = await getCurrentUser();
  if (!user) {
    return {
      success: false,
      formError: "ابتدا وارد حساب خود شوید",
    };
  }

  const { name, color } = parsed.data;

  try {
    await prisma.tag.create({ data: { name, color, userId: user.id } });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        fieldErrors: { name: "برچسبی با این نام از قبل وجود دارد" },
      };
    }
    return { success: false, formError: "خطایی پیش آمد، دوباره تلاش کنید" };
  }

  revalidatePath("/tags");
  return { success: true };
}
