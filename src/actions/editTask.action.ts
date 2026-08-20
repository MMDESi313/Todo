"use server";

import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { taskSchema } from "@/schema/task.schema";
import { revalidatePath } from "next/cache";

type EditTaskResult =
  | { success: true }
  | {
      success: false;
      fieldErrors?: Partial<
        Record<
          "title" | "description" | "priority" | "dueAt" | "tagIds",
          string
        >
      >;
      formError?: string;
    };

export async function editTaskAction(
  taskId: string,
  input: unknown,
): Promise<EditTaskResult> {
  const parsed = taskSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, formError: "اطلاعات وارد‌شده معتبر نیست" };
  }

  const user = await getCurrentUser();
  if (!user) {
    return { success: false, formError: "ابتدا وارد حساب خود شوید" };
  }

  const existing = await prisma.task.findFirst({
    where: { id: taskId, userId: user.id },
  });
  if (!existing) {
    return { success: false, formError: "وظیفه یافت نشد" };
  }

  const { title, description, priority, dueAt, tagIds } = parsed.data;

  if (tagIds.length > 0) {
    const ownedCount = await prisma.tag.count({
      where: { id: { in: tagIds }, userId: user.id },
    });
    if (ownedCount !== tagIds.length) {
      return {
        success: false,
        formError: "یکی از برچسب‌های انتخاب‌شده معتبر نیست",
      };
    }
  }

  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      title,
      description: description || null,
      priority,
      dueAt,
      tags: {
        deleteMany: {},
        create: tagIds.map((tagId) => ({ tag: { connect: { id: tagId } } })),
      },
    },
  });

  revalidatePath("/tasks");
  revalidatePath("/");
  return { success: true };
}
