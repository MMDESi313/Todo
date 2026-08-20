"use client";

import { updateTaskStatusAction } from "@/actions/updateTaskStatus.action";
import { formatTaskDate } from "@/lib/functions/date";
import { cn } from "@/lib/utils";
import { Tag as TagType, Task, TaskTag } from "@prisma/client";
import { Check, Clock, Loader2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { toPersianDigits } from "@/lib/functions/toPersianDigits";

type TaskWithTags = Task & { tags: (TaskTag & { tag: TagType })[] };
const PRIORITY_LABELS = { LOW: "کم", MEDIUM: "متوسط", HIGH: "زیاد" } as const;

export default function TaskCard({ task }: { task: TaskWithTags }) {
  const [status, setStatus] = useState(task.status);
  const [isPending, setIsPending] = useState(false);

  const isOverdue = status === "TODO" && task.dueAt < new Date();
  const isResolved = status === "DONE" || status === "NOT_DONE";

  async function handleStatusChange(newStatus: "DONE" | "NOT_DONE") {
    setIsPending(true);
    const result = await updateTaskStatusAction(task.id, newStatus);
    setIsPending(false);
    if (!result.success) {
      toast.error(result.formError);
      return;
    }
    setStatus(newStatus);
  }

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-xl p-4 flex items-center gap-3 shadow-sm",
        status === "DONE" && "border-primary/20",
        status === "NOT_DONE" && "border-destructive/20",
      )}
    >
      {status === "NOT_DONE" && (
        <span className="text-destructive font-semibold text-xs flex gap-2 border border-destructive/25 px-1 py-1 rounded bg-destructive/10">
          <X size={16} />
        </span>
      )}
      {status === "DONE" && (
        <span className="text-primary font-semibold text-xs flex gap-2 border border-primary/25 px-1 py-1 rounded bg-primary/10">
          <Check size={16} />
        </span>
      )}

      <div className="flex-1 min-w-0">
        <h3
          className={cn(
            "text-sm font-semibold text-foreground",
            status === "DONE" && "line-through text-primary/80",
            status === "NOT_DONE" && "line-through text-destructive/80",
          )}
        >
          {task.title}
        </h3>
        <div className="flex items-center gap-4 mt-1 flex-wrap text-xs">
          <span
            className={cn(
              "text-muted-foreground flex gap-1",
              isOverdue && "text-destructive font-medium",
            )}
          >
            <Clock size={14} />
            {toPersianDigits(formatTaskDate(task.dueAt))}
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {task.tags.map(({ tag }) => (
              <Badge
                key={tag.id}
                style={{
                  backgroundColor: `var(--tag-${tag.color}-bg)`,
                  color: `var(--tag-${tag.color})`,
                }}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <span
        className="text-xs font-medium px-2.5 py-1 rounded-full shrink-0"
        style={{
          backgroundColor: `color-mix(in srgb, var(--priority-${task.priority.toLowerCase()}) 15%, transparent)`,
          color: `var(--priority-${task.priority.toLowerCase()})`,
        }}
      >
        {PRIORITY_LABELS[task.priority]}
      </span>

      {isOverdue &&
        (isPending ? (
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground">
              <Loader2 className="animate-spin" size={16} />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              disabled={isPending}
              onClick={() => handleStatusChange("NOT_DONE")}
              title="انجام نشد"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-destructive hover:border-destructive transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
            <button
              type="button"
              disabled={isPending}
              onClick={() => handleStatusChange("DONE")}
              title="انجام شد"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors cursor-pointer"
            >
              <Check size={16} />
            </button>
          </div>
        ))}
      {!isResolved && !isOverdue && (
        <button
          type="button"
          disabled={isPending}
          onClick={() => handleStatusChange("DONE")}
          className={cn(
            "w-4 h-4 rounded-full transition-colors shrink-0 cursor-pointer flex justify-center items-center",
            isPending && "outline-0",
            !isPending && "outline-2 outline-border hover:outline-primary ",
          )}
          aria-label="علامت‌گذاری به عنوان انجام‌شده"
        >
          {isPending && <Loader2 className="animate-spin" size={20} />}
        </button>
      )}
    </div>
  );
}
