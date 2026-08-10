import DesktopNavLink from "./DesktopNavLink";

export default function DesktopNav() {
  return (
    <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
      <DesktopNavLink href="/" text="خانه" />
      <DesktopNavLink href="/tasks" text="وظایف" />
      <DesktopNavLink href="/tags" text="برچسب ها" />
    </nav>
  );
}
