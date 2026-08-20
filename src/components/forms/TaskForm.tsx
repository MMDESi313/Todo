"use client";

import { TaskFormData } from "@/schema/task.schema";
import { Tag } from "@prisma/client";
import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import TaskDueDatePicker from "../tasks/TaskDueDatePicker";
import TaskTagPicker from "../tasks/TaskTagPicker";
import TaskPrioritySelector from "../tasks/TaskPioritySelector";

export default function TaskForm({
  tags,
  onSubmit,
  formId,
}: {
  tags: Tag[];
  onSubmit: (e: React.BaseSyntheticEvent) => void;
  formId: string;
}) {
  const { control, formState } = useFormContext<TaskFormData>();

  return (
    <form id={formId} className="space-y-6" onSubmit={onSubmit}>
      <FieldGroup>
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>عنوان</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                disabled={formState.isSubmitting}
                placeholder="عنوان وظیفه"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>توضیحات (اختیاری)</FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                disabled={formState.isSubmitting}
                placeholder="توضیحات وظیفه"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel>اولویت</FieldLabel>
              <TaskPrioritySelector
                value={field.value}
                onChange={field.onChange}
                disabled={formState.isSubmitting}
              />
            </Field>
          )}
        />
        <Controller
          name="dueAt"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>تاریخ و ساعت</FieldLabel>
              <TaskDueDatePicker
                value={field.value}
                onChange={field.onChange}
                disabled={formState.isSubmitting}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="tagIds"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel>برچسب‌ها</FieldLabel>
              <TaskTagPicker
                tags={tags}
                value={field.value}
                onChange={field.onChange}
                disabled={formState.isSubmitting}
              />
            </Field>
          )}
        />

        {formState.errors.root && (
          <p className="text-sm text-destructive text-center">
            {formState.errors.root.message}
          </p>
        )}
      </FieldGroup>
    </form>
  );
}
