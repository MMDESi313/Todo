import { User } from "lucide-react";

export default function ProfileInfo({
  username,
  name,
}: {
  username: string;
  name: string;
}) {
  return (
    <>
      <div className="mb-4">
        <div className="w-24 h-24 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground">
          <User size={48} />
        </div>
      </div>
      <h1 className="text-xl font-bold text-foreground">{name}</h1>
      <p dir="ltr" className="text-sm text-muted-foreground mt-1">
        @{username}
      </p>
    </>
  );
}
