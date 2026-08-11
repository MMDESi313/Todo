"use client";

import { logoutAction } from "@/actions/logout.action";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import LogoutButton from "./LogoutButton";

export default function LogoutConfirmation() {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-sm font-semibold text-destructive hover:bg-muted transition-colors px-4 py-2 rounded-lg cursor-pointer">
        خروج
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="text-right">
          <AlertDialogTitle className="font-bold text-destructive">
            قصد خارج شدن از حساب خود را دارید؟
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="justify-start gap-2 mt-4">
          <AlertDialogCancel
            variant="outline"
            className="min-w-20 cursor-pointer"
          >
            انصراف
          </AlertDialogCancel>
          <form action={logoutAction}>
            <LogoutButton/>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
