"use server";

import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { taskSchema } from "@/schema/task.schema";
import { revalidatePath } from "next/cache";

type AddTaskResult =
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

export async function addTaskAction(input: unknown): Promise<AddTaskResult> {
  const parsed = taskSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, formError: "اطلاعات وارد‌شده معتبر نیست" };
  }

  const user = await getCurrentUser();
  if (!user) {
    return { success: false, formError: "ابتدا وارد حساب خود شوید" };
  }

  const { title, description, dueAt, priority, tagIds } = parsed.data;

  if (tagIds.length > 0) {
    const ownedCount = await prisma.tag.count({
      where: { id: { in: tagIds }, userId: user.id },
    });
    if (ownedCount !== tagIds.length) {
      return {
        success: false,
        formError: "برچسب‌های انتخاب‌شده معتبر نیستند",
      };
    }
  }

  await prisma.task.create({
    data: {
      title,
      description: description || null,
      priority,
      dueAt,
      userId: user.id,
      tags: {
        create: tagIds.map((tagId) => ({ tag: { connect: { id: tagId } } })),
      },
    },
  });

  revalidatePath("/tasks");
  revalidatePath("/");
  return { success: true };
}
