"use client";

import { Tag } from "@prisma/client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TaskFormData, taskSchema } from "@/schema/task.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Loader2, Plus } from "lucide-react";
import { addTaskAction } from "@/actions/addTask.action";
import { Separator } from "../ui/separator";
import AddTaskForm from "../forms/TaskForm";

function AddTaskDialog({ tags }: { tags: Tag[] }) {
  const [open, setOpen] = useState(false);

  const form = useForm<TaskFormData>({
    defaultValues: {
      title: "",
      description: "",
      dueAt: new Date(),
      priority: "MEDIUM",
      tagIds: [],
    },
    resolver: zodResolver(taskSchema),
  });

  async function onSubmit(data: TaskFormData) {
    const result = await addTaskAction(data);
    if (!result.success) {
      if (result.fieldErrors) {
        for (const [field, message] of Object.entries(result.fieldErrors)) {
          form.setError(field as keyof TaskFormData, { message });
        }
      }
      if (result.formError) {
        form.setError("root", { message: result.formError });
      }
      return;
    }
    setOpen(false);
  }

  useEffect(() => {
    if (open) form.reset();
  }, [open, form]);

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (form.formState.isSubmitting) return;
        setOpen(nextOpen);
      }}
    >
      <DialogTrigger
        render={() => (
          <Button
            className="flex items-center gap-2 font-semibold text-sm h-9 px-2.5 sm:px-4 rounded-lg shadow-sm transition-colors"
            onClick={() => setOpen(true)}
          >
            <span className="hidden sm:inline">افزودن وظیفه</span>
            <Plus size={18} />
          </Button>
        )}
      />
      <DialogContent
        showCloseButton={false}
        className="max-h-[90vh] overflow-y-auto scrollbar-none"
      >
        <DialogHeader>
          <DialogTitle>افزودن وظیفه</DialogTitle>
          <DialogDescription>
            اطلاعات را وارد کنید و روی «افزودن» بزنید
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <FormProvider {...form}>
          <AddTaskForm
            tags={tags}
            onSubmit={form.handleSubmit(onSubmit)}
            formId="add-task-form"
          />
        </FormProvider>
        <DialogFooter>
          <DialogClose
            render={() => (
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="min-w-20 cursor-pointer"
                disabled={form.formState.isSubmitting}
              >
                انصراف
              </Button>
            )}
          />
          <Button
            type="submit"
            form="add-task-form"
            className="min-w-20 cursor-pointer"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              "افزودن"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddTaskDialog;
