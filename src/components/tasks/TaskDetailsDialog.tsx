"use client";

import { Calendar, Edit, Trash2 } from "lucide-react";
import { Tag, Task, TaskTag } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { formatTaskDate } from "@/lib/functions/date";
import { toPersianDigits } from "@/lib/functions/toPersianDigits";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

type TaskWithTags = Task & { tags: (TaskTag & { tag: Tag })[] };
const STATUS_LABELS = {
  TODO: "در انتظار",
  IN_PROGRESS: "در حال انجام",
  DONE: "انجام شده",
  NOT_DONE: "انجام نشده",
} as const;
const PRIORITY_LABELS = { LOW: "کم", MEDIUM: "متوسط", HIGH: "زیاد" } as const;

export default function TaskDetailDialog({
  task,
  open,
  onOpenChange,
  onEditClick,
  onDeleteClick,
}: {
  task: TaskWithTags;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>جزئیات وظیفه</DialogDescription>
          <DialogTitle className="text-xl">{task.title}</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={cn(
                "text-xs font-semibold px-2.5 py-1 rounded-full border border-border text-muted-foreground",
                task.status === "DONE" && "text-primary border-primary",
                task.status === "NOT_DONE" &&
                  "text-destructive border-destructive",
              )}
            >
              {STATUS_LABELS[task.status]}
            </span>
            <span
              className="text-xs font-medium px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: `color-mix(in srgb, var(--priority-${task.priority.toLowerCase()}) 15%, transparent)`,
                color: `var(--priority-${task.priority.toLowerCase()})`,
              }}
            >
              اولویت {PRIORITY_LABELS[task.priority]}
            </span>
          </div>

          {task.description && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-1">
                توضیحات
              </h4>
              <p className="text-sm text-foreground leading-relaxed">
                {task.description}
              </p>
            </div>
          )}

          <div>
            <h4 className="text-xs font-semibold text-muted-foreground mb-1 flex gap-1">
              <Calendar size={14} />
              تاریخ و زمان انجام
            </h4>
            <p className="text-sm text-foreground">
              {toPersianDigits(formatTaskDate(task.dueAt))}
            </p>
          </div>

          {task.tags.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-1.5">
                برچسب‌ها
              </h4>
              <div className="flex flex-wrap gap-2">
                {task.tags.map(({ tag }) => (
                  <span
                    key={tag.id}
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: `var(--tag-${tag.color}-bg)`,
                      color: `var(--tag-${tag.color})`,
                    }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-3 border-t border-border">
            <button
              type="button"
              onClick={onEditClick}
              className="flex-1 h-10 flex items-center justify-center gap-2 rounded-lg border border-border text-sm font-semibold hover:bg-muted transition-colors cursor-pointer"
            >
              <Edit size={16} />
              ویرایش
            </button>
            <button
              type="button"
              onClick={onDeleteClick}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-destructive hover:border-destructive transition-colors cursor-pointer"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
