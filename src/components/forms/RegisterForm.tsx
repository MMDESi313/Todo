"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerFormSchema } from "@/schema/register.schema";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { registerAction } from "@/actions/register.action";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRetype, setShowPasswordRetype] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { name: "", username: "", password: "", passwordRetype: "" },
  });

  async function onSubmit(data: RegisterFormData) {
    const result = await registerAction(data);
    if (!result.success) {
      if (result.fieldErrors) {
        for (const [field, message] of Object.entries(result.fieldErrors)) {
          form.setError(field as keyof RegisterFormData, { message });
        }
      }
      if (result.formError) {
        form.setError("root", { message: result.formError });
      }
    }
  }

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>نام</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="نام خود را وارد کنید"
                autoComplete="name"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>نام کاربری</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="نام کاربری برای خود بسازید"
                autoComplete="username"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>رمز عبور</FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  id={field.name}
                  type={showPassword ? "text" : "password"}
                  aria-invalid={fieldState.invalid}
                  placeholder="رمز عبور برای خود بسازید"
                  className="pl-10"
                />
                <button
                  type="button"
                  className="absolute left-3 w-fit h-full cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
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
          name="passwordRetype"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>تکرار رمز عبور</FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  id={field.name}
                  type={showPasswordRetype ? "text" : "password"}
                  aria-invalid={fieldState.invalid}
                  placeholder="تکرار رمز عبور را وارد کنید"
                  className="pl-9"
                />
                <button
                  type="button"
                  className="absolute left-3 w-fit h-full cursor-pointer"
                  onClick={() => setShowPasswordRetype((prev) => !prev)}
                >
                  {showPasswordRetype ? (
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
        <Button type="submit" className="font-bold">
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            "ثبت نام"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
