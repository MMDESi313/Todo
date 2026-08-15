"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";
import { deleteTagAction } from "@/actions/deleteTag.action";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

export default function DeleteTagConfirmation({
  tagId,
  tagName,
}: {
  tagId: string;
  tagName: string;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  async function handleDelete() {
    setIsPending(true);
    const result = await deleteTagAction(tagId);
    setIsPending(false);

    if (!result.success) {
      toast.error(result.formError);
      return;
    }

    toast.success("برچسب حذف شد");
    setOpen(false);
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => !isPending && setOpen(next)}
    >
      <AlertDialogTrigger
        render={(props) => (
          <Button variant="ghost" className="h-9 w-9" {...props}>
            <Trash2 size={16} />
          </Button>
        )}
      />
      <AlertDialogContent>
        <AlertDialogHeader className="text-right">
          <AlertDialogTitle className="font-bold text-destructive">
            قصد دارید برچسب «{tagName}» را حذف کنید؟
          </AlertDialogTitle>
          <AlertDialogDescription>
            با انجام این کار این برچسب از تمامی وظایفی که به آن‌ها اختصاص داده
            شده حذف خواهد شد
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="justify-start gap-2 mt-4">
          <AlertDialogCancel
            variant="outline"
            className="min-w-20 cursor-pointer"
            disabled={isPending}
          >
            انصراف
          </AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="min-w-20 cursor-pointer"
          >
            {isPending ? <Loader2 className="animate-spin" size={16} /> : "حذف"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
