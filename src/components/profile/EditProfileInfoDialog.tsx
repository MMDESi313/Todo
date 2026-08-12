"use client";

import { Edit } from "lucide-react";
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

export default function EditProfileInfoDialog({
  username,
  name,
}: {
  username: string;
  name: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ویرایش</DialogTitle>
          <DialogDescription>
            اطلاعات را وارد کنید و روی «ذخیره» بزنید
          </DialogDescription>
        </DialogHeader>
        <EditProfileInfoForm name={name} username={username} />
        <DialogFooter>
          <DialogClose
            render={() => (
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="min-w-20 cursor-pointer"
              >
                انصراف
              </Button>
            )}
          />
          <Button
            type="submit"
            form="update-profile-form"
            className="min-w-20 cursor-pointer"
          >
            ذخیره
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
