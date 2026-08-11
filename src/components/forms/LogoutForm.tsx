"use client";

import { logoutAction } from "@/actions/logout.action";
import { Button } from "../ui/button";

export default function LogoutForm() {
  return (
    <form onSubmit={logoutAction}>
      <Button
        type="submit"
        variant="ghost"
        className="text-sm font-semibold text-destructive hover:text-destructive transition-colors px-4 rounded-lg cursor-pointer border border-destructive flex"
      >
        خروج
      </Button>
    </form>
  );
}
