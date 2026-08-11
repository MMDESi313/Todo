"use client";

import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export default function LogoutButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="destructive"
      className="text-sm font-semibold transition-colors px-4 rounded-lg cursor-pointer min-w-20"
      disabled={pending}
    >
      {pending ? <Loader2 className="animate-spin" /> : "خروج"}
    </Button>
  );
}
