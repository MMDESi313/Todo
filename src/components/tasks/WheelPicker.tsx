"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { toPersianDigits } from "@/lib/functions/toPersianDigits";

const ITEM_HEIGHT = 40;
const VISIBLE_ITEMS = 5;

export default function WheelPicker({
  items,
  value,
  onChange,
  disabled,
}: {
  items: string[];
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isProgrammatic = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const padding = (ITEM_HEIGHT * (VISIBLE_ITEMS - 1)) / 2;

  useEffect(() => {
    const idx = items.indexOf(value);
    const el = containerRef.current;
    if (idx === -1 || !el) return;

    isProgrammatic.current = true;

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.scrollTo({ top: idx * ITEM_HEIGHT, behavior: "auto" });
        setTimeout(() => {
          isProgrammatic.current = false;
        }, 50);
      });
    });

    return () => cancelAnimationFrame(raf);
  }, [value, items]);

  const handleScroll = useCallback(() => {
    if (isProgrammatic.current) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const el = containerRef.current;
      if (!el) return;
      const idx = Math.min(
        Math.max(Math.round(el.scrollTop / ITEM_HEIGHT), 0),
        items.length - 1,
      );
      if (items[idx] !== value) onChange(items[idx]);
    }, 120);
  }, [items, value, onChange]);

  return (
    <div className="relative" style={{ height: ITEM_HEIGHT * VISIBLE_ITEMS }}>
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 border-y-2 border-primary/40 bg-primary/5 rounded-md"
        style={{ height: ITEM_HEIGHT }}
      />
      <div
        ref={containerRef}
        onScroll={disabled ? undefined : handleScroll}
        className={cn(
          "h-full w-14 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden",
          disabled && "pointer-events-none opacity-50",
        )}
        style={{
          scrollSnapType: "y mandatory",
          paddingTop: padding,
          paddingBottom: padding,
          maskImage:
            "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
        }}
      >
        {items.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => !disabled && onChange(item)}
            style={{ height: ITEM_HEIGHT, scrollSnapAlign: "center" }}
            className={cn(
              "flex w-full items-center justify-center text-sm tabular-nums transition-colors cursor-pointer",
              item === value
                ? "text-lg font-bold text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {toPersianDigits(item)}
          </button>
        ))}
      </div>
    </div>
  );
}
