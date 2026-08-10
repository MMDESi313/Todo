"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type LucideIcon } from "lucide-react";

export default function MobileNavLink({
  href,
  text,
  icon: Icon,
}: {
  href: string;
  text: string;
  icon: LucideIcon;
}) {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center gap-1 p-2",
        { "text-primary": path === href },
        { "test-muted-foreground": path !== href },
      )}
    >
      <Icon />
      <span
        className={cn(
          "text-[10px]",
          { "font-semibold": path === href },
          { "font-medium": path !== href },
        )}
      >
        {text}
      </span>
    </Link>
  );
}
