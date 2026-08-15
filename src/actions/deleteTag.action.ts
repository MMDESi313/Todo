"use server";

import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type DeleteTagResult =
  | { success: true }
  | { success: false; formError: string };

export async function deleteTagAction(tagId: string): Promise<DeleteTagResult> {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, formError: "ابتدا وارد حساب خود شوید" };
  }

  const { count } = await prisma.tag.deleteMany({
    where: { id: tagId, userId: user.id },
  });

  if (count === 0) {
    return { success: false, formError: "برچسب یافت نشد" };
  }

  revalidatePath("/tags");
  revalidatePath("/tasks");
  return { success: true };
}
