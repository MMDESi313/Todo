"use client";

import { Edit, Loader2 } from "lucide-react";
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
import { useState } from "react";
import EditProfileInfoForm from "../forms/EditProfileInfoForm";
import { FormProvider, useForm } from "react-hook-form";
import {
  EditProfileFormData,
  editProfileSchema,
} from "@/schema/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileAction } from "@/actions/editProfile.action";

export default function EditProfileInfoDialog({
  username,
  name,
}: {
  username: string;
  name: string;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: { name, username },
  });

  async function onSubmit(data: EditProfileFormData) {
    const result = await editProfileAction(data);

    if (!result.success) {
      if (result.fieldErrors) {
        for (const [field, message] of Object.entries(result.fieldErrors)) {
          form.setError(field as keyof EditProfileFormData, { message });
        }
      }
      if (result.formError) {
        form.setError("root", { message: result.formError });
      }
      return;
    }

    setOpen(false);
  }

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
            className="flex items-center justify-center gap-2 w-full h-11 rounded-lg text-foreground font-semibold text-sm transition-colors px-4 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <Edit size={16} />
            ویرایش اطلاعات
          </Button>
        )}
      />
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>ویرایش</DialogTitle>
          <DialogDescription>
            اطلاعات را وارد کنید و روی «ذخیره» بزنید
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <EditProfileInfoForm onSubmit={form.handleSubmit(onSubmit)} />
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
            form="update-profile-form"
            className="min-w-20 cursor-pointer"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              "ورود"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
