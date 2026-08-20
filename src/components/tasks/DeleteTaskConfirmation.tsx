"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { deleteTaskAction } from "@/actions/deleteTask.action";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

export default function DeleteTaskConfirmation({
  taskId,
  open,
  onOpenChange,
  onDeleted,
}: {
  taskId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void;
}) {
  const [isPending, setIsPending] = useState(false);

  async function handleDelete() {
    setIsPending(true);
    const result = await deleteTaskAction(taskId);
    setIsPending(false);
    if (!result.success) {
      toast.error(result.formError);
      return;
    }
    onDeleted();
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => !isPending && onOpenChange(next)}
    >
      <AlertDialogContent>
        <AlertDialogHeader className="text-right">
          <AlertDialogTitle className="font-bold text-destructive">
            قصد دارید این وظیفه را حذف کنید؟
          </AlertDialogTitle>
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
