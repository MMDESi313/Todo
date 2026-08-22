import TasksHead from "@/components/tasks/TasksHead";
import TasksList from "@/components/tasks/TasksList";
import { getCurrentUser } from "@/lib/auth/session";
import getUserTags from "@/lib/tags";
import { getUserTasks } from "@/lib/tasks";

export default async function TasksPage() {
  const user = await getCurrentUser();
  const [tags, tasks] = await Promise.all([
    getUserTags(user!.id),
    getUserTasks(user!.id),
  ]);

  return (
    <div className="max-w-5xl mx-auto h-full">
      <TasksHead tags={tags} />
      <TasksList tags={tags} tasks={tasks} />
    </div>
  );
}
