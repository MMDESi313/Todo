import { format } from "date-fns";
import { getIranDayRange, toIranDate } from "./functions/date";
import { prisma } from "./prisma";

export async function getUserTasks(userId: string) {
  return await prisma.task.findMany({
    where: { userId },
    include: { tags: { include: { tag: true } } },
    orderBy: { dueAt: "asc" },
  });
}

export async function getUserTasksForDay(userId: string, day: Date) {
  const { start, end } = getIranDayRange(day);
  return await prisma.task.findMany({
    where: { userId: userId, dueAt: { gte: start, lte: end } },
    include: { tags: { include: { tag: true } } },
    orderBy: { dueAt: "asc" },
  });
}

export async function getTaskDaysInRange(
  userId: string,
  rangeStart: Date,
  rangeEnd: Date,
) {
  const { start } = getIranDayRange(rangeStart);
  const { end } = getIranDayRange(rangeEnd);
  const tasks = await prisma.task.findMany({
    where: { userId: userId, dueAt: { gte: start, lte: end } },
    select: { dueAt: true },
  });
  const days = new Set<string>();
  for (const t of tasks) days.add(format(toIranDate(t.dueAt), "yyyy-MM-dd"));
  return days;
}

export async function userHasAnyTasks(userId: string) {
  const task = await prisma.task.findFirst({
    where: { userId: userId },
    select: { id: true },
  });
  return task !== null;
}
