"use client";

import { TagFormData } from "@/schema/tag.schema";
import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import TagColorPicker from "../tags/TagColorPicker";

export default function AddTagForm({
  onSubmit,
}: {
  onSubmit: (e: React.BaseSyntheticEvent) => void;
}) {
  const { control, formState } = useFormContext<TagFormData>();

  return (
    <form id="add-tag-form" className="space-y-6" onSubmit={onSubmit}>
      <FieldGroup>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>نام برچسب</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="نام برچسب را وارد کنید"
                autoComplete="name"
                disabled={formState.isSubmitting}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="color"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>رنگ برچسب</FieldLabel>
              <TagColorPicker
                value={field.value}
                onChange={field.onChange}
                disabled={formState.isSubmitting}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
