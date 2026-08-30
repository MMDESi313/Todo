import Link from "next/link";
import { Tag, Task, TaskTag } from "@prisma/client";
import TaskCard from "../tasks/TaskCard";
import { toPersianDigits } from "@/lib/functions/toPersianDigits";

type TaskWithTags = Task & { tags: (TaskTag & { tag: Tag })[] };

export default function UpcomingTasksWidget({
  tasks,
  total,
  tags,
}: {
  tasks: TaskWithTags[];
  total: number;
  tags: Tag[];
}) {
  const remaining = total - tasks.length;

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-sm font-bold text-foreground">
          نزدیک‌ترین وظایف امروز
        </h2>
        <Link
          href="/tasks"
          className="text-xs font-semibold text-primary hover:underline"
        >
          مشاهده همه
        </Link>
      </div>
      {tasks.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          وظیفه‌ای برای امروز نمونده
        </p>
      ) : (
        <>
          <div className="divide-y divide-border">
            {tasks.map((task) => (
              <div key={task.id}>
                <TaskCard
                  task={task}
                  tags={tags}
                  className="border-none"
                  canShowDetails={false}
                  showTags={false}
                />
              </div>
            ))}
          </div>
          {remaining > 0 && (
            <p className="text-xs text-muted-foreground text-center py-2 border-t border-border">
              و {toPersianDigits(remaining)} وظیفه‌ی دیگر
            </p>
          )}
        </>
      )}
    </div>
  );
}
