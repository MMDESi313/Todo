import TaskCalendarNav from "@/components/tasks/TaskCalendarNav";
import TasksHead from "@/components/tasks/TasksHead";
import TasksList from "@/components/tasks/TasksList";
import { getCurrentUser } from "@/lib/auth/session";
import { parseDateParam } from "@/lib/functions/date";
import getUserTags from "@/lib/tags";
import {
  getTaskDaysInRange,
  getUserTasksForDay,
  userHasAnyTasks,
} from "@/lib/tasks";
import { endOfWeek, startOfWeek } from "date-fns";

export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const user = await getCurrentUser();
  const { date } = await searchParams;
  const selectedDay = parseDateParam(date);

  const weekStart = startOfWeek(selectedDay, { weekStartsOn: 6 });
  const weekEnd = endOfWeek(selectedDay, { weekStartsOn: 6 });

  const [tags, tasks, daysWithTasks, hasAnyTasksEver] = await Promise.all([
    getUserTags(user!.id),
    getUserTasksForDay(user!.id, selectedDay),
    getTaskDaysInRange(user!.id, weekStart, weekEnd),
    userHasAnyTasks(user!.id),
  ]);

  return (
    <div className="max-w-5xl mx-auto h-full">
      <TasksHead tags={tags} />
      <TaskCalendarNav
        selectedDay={selectedDay}
        daysWithTasks={Array.from(daysWithTasks)}
      />
      <TasksList tags={tags} tasks={tasks} hasAnyTasksEver={hasAnyTasksEver} />
    </div>
  );
}
