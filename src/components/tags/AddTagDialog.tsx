"use client";

import { addTagAction } from "@/actions/addTag.action";
import { TagFormData, tagSchema } from "@/schema/tag.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
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
import { Button } from "../ui/button";
import { Loader2, Plus } from "lucide-react";
import TagForm from "../forms/TagForm";
import { Separator } from "../ui/separator";
import TagPreview from "./TagPreview";

export default function AddTagDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<TagFormData>({
    resolver: zodResolver(tagSchema),
    defaultValues: { name: "", color: 1 },
  });

  async function onSubmit(data: TagFormData) {
    const result = await addTagAction(data);

    if (!result.success) {
      if (result.fieldErrors) {
        for (const [field, message] of Object.entries(result.fieldErrors)) {
          form.setError(field as keyof TagFormData, { message });
        }
      }
      if (result.formError) {
        form.setError("root", { message: result.formError });
      }
      return;
    }

    setOpen(false);
  }

  const tagName = useWatch({
    control: form.control,
    name: "name",
  });
  const tagColor = useWatch({
    control: form.control,
    name: "color",
  });

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
            className="flex items-center gap-2 font-semibold text-sm h-9 px-2.5 sm:px-4 rounded-lg shadow-sm transition-colors"
            onClick={() => setOpen(true)}
          >
            <span className="hidden sm:inline">افزودن برچسب</span>
            <Plus size={18} />
          </Button>
        )}
      />
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>افزودن برچسب</DialogTitle>
          <DialogDescription>
            اطلاعات را وارد کنید و روی «افزودن» بزنید
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <FormProvider {...form}>
          <TagForm
            onSubmit={form.handleSubmit(onSubmit)}
            formId="add-tag-form"
          />
        </FormProvider>
        <Separator />
        <TagPreview color={tagColor} name={tagName} />
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
            form="add-tag-form"
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
