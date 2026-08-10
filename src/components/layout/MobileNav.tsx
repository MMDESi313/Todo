"use client";

import { Home, ListCheck, Tags, UserCircle } from "lucide-react";
import MobileNavLink from "./MobileNavLink";

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-card border-t border-def h-16 flex items-center justify-around px-4">
      <MobileNavLink href="/" text="خانه" icon={Home} />
      <MobileNavLink href="/tasks" text="وظایف" icon={ListCheck} />
      <MobileNavLink href="/tags" text="برچسب ها" icon={Tags} />
      <MobileNavLink href="/profile" text="نمایه" icon={UserCircle} />
    </nav>
  );
}
