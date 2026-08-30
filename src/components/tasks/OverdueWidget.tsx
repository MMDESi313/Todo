import { Tag, Task, TaskTag } from "@prisma/client";
import TaskCard from "./TaskCard";
import { toPersianDigits } from "@/lib/functions/toPersianDigits";

type TaskWithTags = Task & { tags: (TaskTag & { tag: Tag })[] };

export default function OverdueWidget({
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
      <div className="p-4 border-b border-border">
        <h2 className="text-sm font-bold text-foreground">گذشته از موعد</h2>
      </div>
      {tasks.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          وظیفه گذشته از موعدی نداری
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
                  showTags={false}
                  canShowDetails={false}
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
