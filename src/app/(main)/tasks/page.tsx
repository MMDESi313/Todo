import EmptyTasksState from "@/components/tasks/EmptyTasksState";
import TaskCard from "@/components/tasks/TaskCard";
import TasksHead from "@/components/tasks/TasksHead";
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
      {tasks.length === 0 ? (
        <EmptyTasksState />
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} tags={tags} />
          ))}
        </div>
      )}
    </div>
  );
}
