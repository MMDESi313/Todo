"use server";

import { destroySession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

type LogoutResult = { success: false; formError: string };

export async function logoutAction(): Promise<LogoutResult | void> {
  try {
    await destroySession();
  } catch {
    return {
      success: false,
      formError: "مشکلی در خروج از حساب پیش آمد، دوباره تلاش کنید",
    };
  }
  redirect("/login");
}
