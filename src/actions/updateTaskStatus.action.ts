"use server";

import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type UpdateTaskStatusResult =
  | { success: true }
  | { success: false; formError: string };

export async function updateTaskStatusAction(
  taskId: string,
  status: "DONE" | "NOT_DONE",
): Promise<UpdateTaskStatusResult> {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, formError: "ابتدا وارد حساب خود شوید" };
  }

  const { count } = await prisma.task.updateMany({
    where: {
      id: taskId,
      userId: user.id,
      status: { in: ["TODO", "IN_PROGRESS"] },
    },
    data: { status },
  });

  if (count === 0) {
    return {
      success: false,
      formError: "این وظیفه یافت نشد یا قبلاً نهایی شده است",
    };
  }

  revalidatePath("/tasks");
  revalidatePath("/");
  return { success: true };
}
