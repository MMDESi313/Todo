import { EditProfileFormData } from "@/schema/profile.schema";
import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export default function EditProfileInfoForm({
  onSubmit,
}: {
  onSubmit: (e: React.BaseSyntheticEvent) => void;
}) {
  const { control, formState } = useFormContext<EditProfileFormData>();

  return (
    <form id="update-profile-form" className="space-y-6" onSubmit={onSubmit}>
      <FieldGroup>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>نام</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="نام خود را وارد کنید"
                autoComplete="name"
                disabled={formState.isSubmitting}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="username"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>نام کاربری</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="نام کاربری برای خود بسازید"
                autoComplete="username"
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
