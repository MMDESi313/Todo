import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { ChangePasswordFormData } from "@/schema/changePassword.schema";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChangePasswordForm({
  onSubmit,
}: {
  onSubmit: (e: React.BaseSyntheticEvent) => void;
}) {
  const { control, formState } = useFormContext<ChangePasswordFormData>();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordRetype, setShowNewPasswordRetype] = useState(false);

  return (
    <form id="change-password-form" className="space-y-6" onSubmit={onSubmit}>
      <FieldGroup>
        <Controller
          name="currentPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>رمز عبور فعلی</FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  id={field.name}
                  type={showCurrentPassword ? "text" : "password"}
                  aria-invalid={fieldState.invalid}
                  placeholder="رمز عبور فعلی خود را وارد کنید"
                  className="pl-10"
                  autoComplete="current-password"
                  disabled={formState.isSubmitting}
                />
                <button
                  type="button"
                  className="absolute left-3 w-fit h-full cursor-pointer"
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                  disabled={formState.isSubmitting}
                >
                  {showCurrentPassword ? (
                    <Eye
                      size={16}
                      className={cn("text-primary", {
                        "text-destructive": fieldState.invalid,
                      })}
                    />
                  ) : (
                    <EyeOff size={16} />
                  )}
                </button>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="newPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>رمز عبور جدید</FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  id={field.name}
                  type={showNewPassword ? "text" : "password"}
                  aria-invalid={fieldState.invalid}
                  placeholder="رمز عبور جدید خود را وارد کنید"
                  className="pl-10"
                  autoComplete="current-password"
                  disabled={formState.isSubmitting}
                />
                <button
                  type="button"
                  className="absolute left-3 w-fit h-full cursor-pointer"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  disabled={formState.isSubmitting}
                >
                  {showNewPassword ? (
                    <Eye
                      size={16}
                      className={cn("text-primary", {
                        "text-destructive": fieldState.invalid,
                      })}
                    />
                  ) : (
                    <EyeOff size={16} />
                  )}
                </button>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="newPasswordRetype"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>تکرار رمز عبور جدید</FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  id={field.name}
                  type={showNewPasswordRetype ? "text" : "password"}
                  aria-invalid={fieldState.invalid}
                  placeholder="تکرار رمز عبور جدید خود را وارد کنید"
                  className="pl-10"
                  autoComplete="current-password"
                  disabled={formState.isSubmitting}
                />
                <button
                  type="button"
                  className="absolute left-3 w-fit h-full cursor-pointer"
                  onClick={() => setShowNewPasswordRetype((prev) => !prev)}
                  disabled={formState.isSubmitting}
                >
                  {showNewPasswordRetype ? (
                    <Eye
                      size={16}
                      className={cn("text-primary", {
                        "text-destructive": fieldState.invalid,
                      })}
                    />
                  ) : (
                    <EyeOff size={16} />
                  )}
                </button>
              </div>
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
