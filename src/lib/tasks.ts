import { prisma } from "./prisma";

export async function getUserTasks(userId: string) {
  return await prisma.task.findMany({
    where: { userId },
    include: { tags: { include: { tag: true } } },
    orderBy: { dueAt: "asc" },
  });
}
