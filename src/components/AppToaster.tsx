"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@wrksz/themes/client";
import { Toaster } from "sonner";

export function AppToaster() {
  const isMobile = useIsMobile(640);
  const theme = useTheme();

  return (
    <Toaster
      className="select-none"
      position={isMobile ? "top-center" : "top-right"}
      toastOptions={{
        style: {
          fontFamily: "vazirmatn",
        },
      }}
      theme={theme.theme}
      richColors
    />
  );
}
