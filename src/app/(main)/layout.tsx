import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import { getCurrentUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function MainLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return (
    <>
      <Header />
      <main className="p-4 md:p-8">{children}</main>
      <MobileNav />
    </>
  );
}
