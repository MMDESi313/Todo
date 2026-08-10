import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";

export default function MainLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto p-4 md:p-8">{children}</main>
      <MobileNav />
    </>
  );
}
