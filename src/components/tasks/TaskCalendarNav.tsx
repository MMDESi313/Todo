"use client";

import {
  addDays,
  startOfWeek,
  isSameDay,
  format as formatGregorian,
} from "date-fns";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns-jalali";
import { toPersianDigits } from "@/lib/functions/toPersianDigits";

function toDateParam(date: Date) {
  return formatGregorian(date, "yyyy-MM-dd");
}

export default function TaskCalendarNav({
  selectedDay,
  daysWithTasks,
}: {
  selectedDay: Date;
  daysWithTasks: string[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [popoverOpen, setPopoverOpen] = useState(false);

  function goToDay(date: Date) {
    startTransition(() => router.push(`/tasks?date=${toDateParam(date)}`));
  }

  const weekStart = startOfWeek(selectedDay, { weekStartsOn: 6 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm p-3 md:p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => goToDay(addDays(weekStart, -1))}
          disabled={isPending}
        >
          <ChevronRight size={18} />
        </Button>

        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-foreground">
            {toPersianDigits(format(selectedDay, "MMMM yyyy"))}
          </span>
          <button
            type="button"
            onClick={() => goToDay(new Date())}
            disabled={isPending}
            className="text-xs font-semibold text-primary hover:bg-muted px-2 py-1 rounded-md transition-colors cursor-pointer"
          >
            امروز
          </button>
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger
              render={(props) => (
                <button
                  {...props}
                  className="p-1.5 rounded-md text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
                  aria-label="انتخاب تاریخ"
                >
                  <CalendarDays size={16} />
                </button>
              )}
            />
            <PopoverContent align="center" className="w-auto p-2">
              <Calendar
                mode="single"
                selected={selectedDay}
                onSelect={(date) => {
                  if (date) {
                    goToDay(date);
                    setPopoverOpen(false);
                  }
                }}
                dir="rtl"
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => goToDay(addDays(weekStart, 7))}
          disabled={isPending}
        >
          <ChevronLeft size={18} />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1.5 md:gap-2">
        {weekDays.map((day) => {
          const isSelected = isSameDay(day, selectedDay);
          const isToday = isSameDay(day, new Date());
          const hasTasks = daysWithTasks.includes(toDateParam(day));
          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={isPending}
              onClick={() => goToDay(day)}
              className={cn(
                "flex flex-col items-center gap-1 py-2 rounded-lg transition-colors relative cursor-pointer",
                isSelected
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              <span className="text-[11px] font-medium opacity-90">
                {toPersianDigits(format(day, "EEEEEE"))}
              </span>
              <span
                className={cn(
                  "text-sm",
                  isSelected
                    ? "font-bold"
                    : isToday && "font-bold text-primary",
                )}
              >
                {toPersianDigits(format(day, "d"))}
              </span>
              {hasTasks && !isSelected && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
