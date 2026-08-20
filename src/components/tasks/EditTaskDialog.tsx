"use client";

import { editTaskAction } from "@/actions/editTask.action";
import { TaskFormData, taskSchema } from "@/schema/task.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tag, Task, TaskTag } from "@prisma/client";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import TaskForm from "../forms/TaskForm";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Separator } from "../ui/separator";

type TaskWithTags = Task & { tags: (TaskTag & { tag: Tag })[] };

export default function EditTaskDialog({
  task,
  tags,
  open,
  onOpenChange,
}: {
  task: TaskWithTags;
  tags: Tag[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task.title,
      description: task.description ?? "",
      priority: task.priority,
      dueAt: task.dueAt,
      tagIds: task.tags.map((t) => t.tagId),
    },
  });

  async function onSubmit(data: TaskFormData) {
    const result = await editTaskAction(task.id, data);
    if (!result.success) {
      if (result.fieldErrors) {
        for (const [field, message] of Object.entries(result.fieldErrors)) {
          form.setError(field as keyof TaskFormData, { message });
        }
      }
      if (result.formError)
        form.setError("root", { message: result.formError });
      return;
    }
    onOpenChange(false);
  }

  useEffect(() => {
    if (open) {
      form.reset({
        title: task.title,
        description: task.description ?? "",
        priority: task.priority,
        dueAt: task.dueAt,
        tagIds: task.tags.map((t) => t.tagId),
      });
    }
  }, [open, task, form]);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) =>
        !form.formState.isSubmitting && onOpenChange(next)
      }
    >
      <DialogContent
        showCloseButton={false}
        className="max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>ویرایش وظیفه</DialogTitle>
          <DialogDescription>تغییرات را اعمال کنید</DialogDescription>
        </DialogHeader>
        <Separator />
        <FormProvider {...form}>
          <TaskForm
            tags={tags}
            formId="edit-task-form"
            onSubmit={form.handleSubmit(onSubmit)}
          />
        </FormProvider>
        <DialogFooter>
          <DialogClose
            render={(props) => (
              <Button
                {...props}
                type="button"
                variant="outline"
                className="min-w-20"
                disabled={form.formState.isSubmitting}
              >
                انصراف
              </Button>
            )}
          />
          <Button
            type="submit"
            form="edit-task-form"
            className="min-w-20"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              "ذخیره"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
