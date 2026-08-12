"use client";

import { Lock } from "lucide-react";
import { Button } from "../ui/button";
import EditProfileInfoDialog from "./EditProfileInfoDialog";

export default function EditProfileInfo({
  username,
  name,
}: {
  username: string;
  name: string;
}) {
  return (
    <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
      <EditProfileInfoDialog name={name} username={username}/>
      <Button
        variant="outline"
        className="flex items-center justify-center gap-2 w-full h-11 rounded-lg text-foreground font-semibold text-sm transition-colors px-4"
      >
        <Lock size={16} />
        تغییر رمز عبور
      </Button>
    </div>
  );
}
