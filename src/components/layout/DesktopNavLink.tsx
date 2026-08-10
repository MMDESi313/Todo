"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DesktopNavLink({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "px-4 py-2 rounded-lg transition-colors text-sm",
        { "bg-muted text-foreground font-bold": path === href },
        { "hover:bg-muted text-secondary font-medium": path !== href },
      )}
    >
      {text}
    </Link>
  );
}
