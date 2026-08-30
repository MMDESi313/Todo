"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Check, Clock, Loader2, X } from "lucide-react";
import { Task, Tag as TagType, TaskTag } from "@prisma/client";
import { updateTaskStatusAction } from "@/actions/updateTaskStatus.action";
import { cn } from "@/lib/utils";
import EditTaskDialog from "./EditTaskDialog";
import DeleteTaskConfirmation from "./DeleteTaskConfirmation";
import { formatTaskDate } from "@/lib/functions/date";
import TaskDetailDialog from "./TaskDetailsDialog";
import { toPersianDigits } from "@/lib/functions/toPersianDigits";
import { Badge } from "../ui/badge";

type TaskWithTags = Task & { tags: (TaskTag & { tag: TagType })[] };
const PRIORITY_LABELS = { LOW: "کم", MEDIUM: "متوسط", HIGH: "زیاد" } as const;

export default function TaskCard({
  task: initialTask,
  tags,
  className,
  showTags,
  canShowDetails = true,
}: {
  task: TaskWithTags;
  tags: TagType[];
  className?: string;
  showTags?: boolean;
  canShowDetails?: boolean;
}) {
  const [task, setTask] = useState(initialTask);
  const [isPending, setIsPending] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const isOverdue = task.status === "TODO" && task.dueAt < new Date();
  const isResolved = task.status === "DONE" || task.status === "NOT_DONE";

  async function handleStatusChange(newStatus: "DONE" | "NOT_DONE") {
    setIsPending(true);
    const result = await updateTaskStatusAction(task.id, newStatus);
    setIsPending(false);
    if (!result.success) {
      toast.error(result.formError);
      return;
    }
    setTask((prev) => ({ ...prev, status: newStatus }));
  }

  return (
    <>
      <div
        className={cn(
          "bg-card border border-border rounded-xl p-4 flex items-center gap-3 shadow-sm",
          task.status === "DONE" && "border-primary/20",
          task.status === "NOT_DONE" && "border-destructive/20",
          className,
        )}
      >
        <div className="flex-1 min-w-0">
          <h3
            onClick={() => (canShowDetails ? setDetailOpen(true) : () => {})}
            className={cn(
              "w-fit text-sm font-semibold text-foreground",
              task.status === "DONE" && "line-through text-primary/80",
              task.status === "NOT_DONE" && "line-through text-destructive/80",
              canShowDetails && "cursor-pointer",
            )}
          >
            {task.title}
          </h3>
          <div className="flex items-center gap-4 mt-2 flex-wrap text-xs">
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
              {showTags &&
                task.tags.map(({ tag }) => (
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

        {task.status === "DONE" && (
          <div className="w-6 h-6 flex items-center justify-center rounded-full border border-primary text-primary bg-primary/10">
            <Check size={16} />
          </div>
        )}
        {task.status === "NOT_DONE" && (
          <div className="w-6 h-6 flex items-center justify-center rounded-full border border-destructive text-destructive bg-destructive/10">
            <X size={16} />
          </div>
        )}
        {!isResolved &&
          !isOverdue &&
          (isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <button
              type="button"
              disabled={isPending}
              onClick={(e) => {
                e.stopPropagation();
                handleStatusChange("DONE");
              }}
              className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-border hover:border-primary transition-colors shrink-0 cursor-pointer"
              aria-label="علامت‌گذاری به عنوان انجام‌شده"
            />
          ))}

        {isOverdue &&
          (isPending ? (
            <button
              type="button"
              disabled={isPending}
              onClick={(e) => {
                e.stopPropagation();
                handleStatusChange("DONE");
              }}
              title="انجام شد"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-border"
            >
              <Loader2 size={16} className="animate-spin" />
            </button>
          ) : (
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                disabled={isPending}
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatusChange("NOT_DONE");
                }}
                title="انجام نشد"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-destructive hover:border-destructive transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatusChange("DONE");
                }}
                title="انجام شد"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors cursor-pointer"
              >
                <Check size={16} />
              </button>
            </div>
          ))}
      </div>

      <>
        <TaskDetailDialog
          task={task}
          open={detailOpen}
          onOpenChange={setDetailOpen}
          onEditClick={() => {
            setDetailOpen(false);
            setEditOpen(true);
          }}
          onDeleteClick={() => {
            setDetailOpen(false);
            setDeleteOpen(true);
          }}
        />
        <EditTaskDialog
          task={task}
          tags={tags}
          open={editOpen}
          onOpenChange={setEditOpen}
        />
        <DeleteTaskConfirmation
          taskId={task.id}
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          onDeleted={() => setDeleteOpen(false)}
        />
      </>
    </>
  );
}
