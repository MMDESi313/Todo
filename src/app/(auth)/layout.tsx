import { getCurrentUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();
  if (user) redirect("/profile");
  return (
    <>
      <main className="min-h-dvh flex flex-col items-center justify-center p-4 transition-colors duration-300">
        {children}
      </main>
    </>
  );
}
