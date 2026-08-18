import TasksHead from "@/components/tasks/TasksHead";
import { getCurrentUser } from "@/lib/auth/session";
import getUserTags from "@/lib/tags";

export default async function TasksPage() {
  const user = await getCurrentUser();
  const tags = await getUserTags(user!.id);

  return (
    <div className="max-w-5xl mx-auto h-full">
      <TasksHead tags={tags} />
    </div>
  );
}
