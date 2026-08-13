"use client";

import { Loader2, Lock } from "lucide-react";
import { Button } from "../ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChangePasswordFormData,
  changePasswordSchema,
} from "@/schema/changePassword.schema";
import ChangePasswordForm from "../forms/ChangePasswordForm";
import { changePasswordAction } from "@/actions/changePassword.action";

export default function ChangePasswordDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordRetype: "",
    },
  });

  async function onSubmit(data: ChangePasswordFormData) {
    const result = await changePasswordAction(data);
    if (!result.success) {
      if (result.fieldErrors) {
        for (const [field, message] of Object.entries(result.fieldErrors)) {
          form.setError(field as keyof ChangePasswordFormData, { message });
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
    if (open) {
      form.reset();
    }
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
            variant="outline"
            className="flex items-center justify-center gap-2 w-full h-11 rounded-lg text-foreground font-semibold text-sm transition-colors px-4"
            onClick={() => setOpen(true)}
          >
            <Lock size={16} />
            تغییر رمز عبور
          </Button>
        )}
      />
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>تغییر رمز عبور</DialogTitle>
          <DialogDescription>
            اطلاعات را وارد کنید و روی «تایید» بزنید
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <ChangePasswordForm onSubmit={form.handleSubmit(onSubmit)} />
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
            form="change-password-form"
            className="min-w-20 cursor-pointer"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              "تایید"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
