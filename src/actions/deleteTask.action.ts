"use server";

import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type DeleteTaskResult =
  | { success: true }
  | { success: false; formError: string };

export async function deleteTaskAction(
  taskId: string,
): Promise<DeleteTaskResult> {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, formError: "ابتدا وارد حساب خود شوید" };
  }

  const { count } = await prisma.task.deleteMany({
    where: { id: taskId, userId: user.id },
  });

  if (count === 0) {
    return { success: false, formError: "وظیفه یافت نشد" };
  }

  revalidatePath("/tasks");
  revalidatePath("/");
  return { success: true };
}
