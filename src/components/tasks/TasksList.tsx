"use client";

import { useMemo, useState } from "react";
import { Tag, Task, TaskTag } from "@prisma/client";
import TaskCard from "./TaskCard";
import TasksFilterBar, { PriorityFilter, StatusFilter } from "./TasksFilterBar";
import EmptyTasksState from "./EmptyTasksState";

type TaskWithTags = Task & { tags: (TaskTag & { tag: Tag })[] };

export default function TasksList({
  tasks,
  tags,
  hasAnyTasksEver,
}: {
  tasks: TaskWithTags[];
  tags: Tag[];
  hasAnyTasksEver: boolean;
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("ALL");
  const [priority, setPriority] = useState<PriorityFilter>("ALL");

  const filteredTasks = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tasks.filter((task) => {
      if (status !== "ALL" && task.status !== status) return false;
      if (priority !== "ALL" && task.priority !== priority) return false;
      if (q && !task.title.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [tasks, status, priority, search]);

  if (!hasAnyTasksEver) {
    return <EmptyTasksState />;
  }

  return (
    <>
      <TasksFilterBar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        priority={priority}
        onPriorityChange={setPriority}
      />
      {tasks.length === 0 ? (
        <p className="text-muted-foreground text-center py-12 text-sm">
          برای این روز وظیفه‌ای ثبت نشده است
        </p>
      ) : filteredTasks.length === 0 ? (
        <p className="text-muted-foreground text-center py-12 text-sm">
          هیچ وظیفه‌ای با این فیلترها پیدا نشد
        </p>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} tags={tags} />
          ))}
        </div>
      )}
    </>
  );
}
