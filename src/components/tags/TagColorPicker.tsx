"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const TAG_COLORS = Array.from({ length: 10 }, (_, i) => i + 1);

export default function TagColorPicker({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: (color: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {TAG_COLORS.map((c) => (
        <button
          key={c}
          type="button"
          disabled={disabled}
          onClick={() => onChange(c)}
          aria-label={`رنگ شماره ${c}`}
          className={cn(
            "w-9 h-9 rounded-full border-2 transition-all cursor-pointer",
            value === c
              ? "border-3 border-foreground flex items-center justify-center"
              : "border-transparent hover:scale-105",
          )}
          style={{ backgroundColor: `var(--tag-${c})` }}
        >
          {value === c && <Check size={20} className="stroke-3" />}
        </button>
      ))}
    </div>
  );
}
