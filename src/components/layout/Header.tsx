import { UserCircle } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import DesktopNav from "./DesktopNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-99 bg-card border-b border-border h-14 md:h-16 flex items-center justify-between px-4 md:px-8 transition-colors">
      <Link href={"/"} className="flex items-center gap-2 select-none">
        <Image
          src="/logo.png"
          draggable={false}
          alt="لوگو"
          width={28}
          height={28}
        />
        <span className="text-lg font-bold text-foreground">لیست کارها</span>
      </Link>

      <DesktopNav />

      <div className="flex items-center md:gap-2">
        <ThemeToggle />
        <Link
          href={"/profile"}
          className="hidden md:flex p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <UserCircle size={20} />
        </Link>
      </div>
    </header>
  );
}
