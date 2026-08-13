"use client";

import EditProfileInfoDialog from "./EditProfileInfoDialog";
import ChangePasswordDialog from "./ChangePasswordDialog";

export default function EditProfileInfo({
  username,
  name,
}: {
  username: string;
  name: string;
}) {
  return (
    <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
      <EditProfileInfoDialog name={name} username={username} />
      <ChangePasswordDialog />
    </div>
  );
}
