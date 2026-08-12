import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",

          "--success-bg": "var(--sonner-success-bg)",
          "--success-text": "var(--sonner-success-text)",
          "--success-border": "var(--sonner-success-border)",

          "--error-bg": "var(--sonner-error-bg)",
          "--error-text": "var(--sonner-error-text)",
          "--error-border": "var(--sonner-error-border)",

          "--warning-bg": "var(--sonner-warning-bg)",
          "--warning-text": "var(--sonner-warning-text)",
          "--warning-border": "var(--sonner-warning-border)",

          "--info-bg": "var(--sonner-info-bg)",
          "--info-text": "var(--sonner-info-text)",
          "--info-border": "var(--sonner-info-border)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
