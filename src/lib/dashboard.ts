import { subDays } from "date-fns";
import { getIranDayRange, toIranDate } from "./functions/date";
import { prisma } from "./prisma";
import { format } from "date-fns-jalali";

const EMPTY_COUNTS = { TODO: 0, IN_PROGRESS: 0, DONE: 0, NOT_DONE: 0 };

export async function getTodayStats(userId: string) {
  const { start, end } = getIranDayRange(new Date());
  const grouped = await prisma.task.groupBy({
    by: ["status"],
    where: { userId: userId, dueAt: { gte: start, lte: end } },
    _count: true,
  });
  const counts = { ...EMPTY_COUNTS };
  for (const g of grouped) counts[g.status] = g._count;

  const total =
    counts.TODO + counts.DONE + counts.NOT_DONE + counts.IN_PROGRESS;
  const pending = counts.TODO + counts.IN_PROGRESS;
  const progressPercent =
    total === 0 ? 0 : Math.round((counts.DONE / total) * 100);
  return {
    total,
    done: counts.DONE,
    notDone: counts.NOT_DONE,
    pending,
    progressPercent,
  };
}

export async function getUpcomingTasksToday(userId: string, limit = 3) {
  const { start, end } = getIranDayRange(new Date());
  const where = {
    userId,
    status: "TODO" as const,
    dueAt: { gte: start, lte: end },
  };

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      include: { tags: { include: { tag: true } } },
      orderBy: { dueAt: "asc" },
      take: limit,
    }),
    prisma.task.count({ where }),
  ]);

  return { tasks, total };
}

export async function getOverdueTasks(userId: string, limit = 3) {
  const now = new Date();
  const where = { userId, status: "TODO" as const, dueAt: { lt: now } };

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      include: { tags: { include: { tag: true } } },
      orderBy: { dueAt: "asc" },
      take: limit,
    }),
    prisma.task.count({ where }),
  ]);

  return { tasks, total };
}

export async function getLast7DaysStats(userId: string) {
  const today = new Date();
  const { start } = getIranDayRange(subDays(today, 6));
  const { end } = getIranDayRange(today);

  const tasks = await prisma.task.findMany({
    where: { userId, dueAt: { gte: start, lte: end } },
    select: { dueAt: true, status: true },
  });

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(today, 6 - i);
    return {
      date,
      key: format(toIranDate(date), "yyyy-MM-dd"),
      total: 0,
      done: 0,
    };
  });

  for (const t of tasks) {
    const key = format(toIranDate(t.dueAt), "yyyy-MM-dd");
    const bucket = days.find((d) => d.key === key);
    if (bucket) {
      bucket.total++;
      if (t.status === "DONE") bucket.done++;
    }
  }

  return days;
}

export async function getAllTimeStats(userId: string) {
  const grouped = await prisma.task.groupBy({
    by: ["status"],
    where: { userId },
    _count: true,
  });

  const counts = { ...EMPTY_COUNTS };

  for (const g of grouped) counts[g.status] = g._count;

  const total =
    counts.TODO + counts.IN_PROGRESS + counts.DONE + counts.NOT_DONE;
  return {
    total,
    done: counts.DONE,
    notDone: counts.NOT_DONE,
    pending: counts.TODO + counts.IN_PROGRESS,
  };
}
