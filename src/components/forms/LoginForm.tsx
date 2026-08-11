"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { LoginFormData, loginFormSchema } from "@/schema/login.schema";
import { loginAction } from "@/actions/login.action";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { username: "", password: "" },
  });

  async function onSubmit(data: LoginFormData) {
    const result = await loginAction(data);
    if (!result.success && result.formError) {
      form.setError("root", { message: result.formError });
    }
  }

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
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
                placeholder="نام کاربری خود را وارد کنید"
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
                  placeholder="رمز عبور خود را وارد کنید"
                  className="pl-10"
                  autoComplete="current-password"
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

        {form.formState.errors.root && (
          <p className="text-sm text-destructive text-center">
            {form.formState.errors.root.message}
          </p>
        )}

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="font-bold cursor-pointer"
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            "ورود"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
