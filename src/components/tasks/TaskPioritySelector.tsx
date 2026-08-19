"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const PRIORITIES = [
  { value: "LOW", label: "کم", color: "var(--priority-low)" },
  {
    value: "MEDIUM",
    label: "متوسط",
    color: "var(--priority-medium)",
  },
  {
    value: "HIGH",
    label: "زیاد",
    color: "var(--priority-high)",
  },
] as const;

export default function TaskPrioritySelector({
  value,
  onChange,
  disabled,
}: {
  value: "LOW" | "MEDIUM" | "HIGH";
  onChange: (val: "LOW" | "MEDIUM" | "HIGH") => void;
  disabled?: boolean;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {PRIORITIES.map(({ value: v, label, color }) => {
        const selected = value === v;
        return (
          <Button
            key={v}
            type="button"
            variant="ghost"
            disabled={disabled}
            onClick={() => onChange(v)}
            className={cn(
              "flex flex-col items-center gap-1.5 py-3 rounded-lg border-2 transition-all cursor-pointer",
              {
                "border-border text-muted-foreground hover:bg-muted": !selected,
              },
            )}
            style={
              selected
                ? {
                    backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
                    borderColor: color,
                    color: color,
                  }
                : undefined
            }
          >
            <span className="text-xs font-semibold">{label}</span>
          </Button>
        );
      })}
    </div>
  );
}
