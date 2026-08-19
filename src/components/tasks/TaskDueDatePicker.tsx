"use client";

import { useState } from "react";
import { format, startOfDay } from "date-fns-jalali";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import TaskTimePicker from "./TaskTimePicker";
import { toPersianDigits } from "@/lib/functions/toPersianDigits";

function combine(date: Date | undefined, timeStr: string) {
  if (!date) return undefined;
  const [h, m] = timeStr.split(":").map(Number);
  const d = new Date(date);
  d.setHours(h, m, 0, 0);
  return d;
}

function toTimeStr(date: Date | undefined) {
  if (!date) return "12:00";
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

export default function TaskDueDatePicker({
  value,
  onChange,
  disabled,
}: {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const timeStr = toTimeStr(value);

  return (
    <div className="flex gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={(props) => (
            <Button
              {...props}
              type="button"
              variant="outline"
              disabled={disabled}
              className={cn(
                "flex-1 justify-start gap-2 font-normal",
                !value && "text-muted-foreground",
              )}
            >
              <CalendarIcon size={16} />
              {value
                ? toPersianDigits(format(value, "d MMMM yyyy"))
                : "انتخاب تاریخ"}
            </Button>
          )}
        />
        <PopoverContent align="start" className="w-auto p-3">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange(combine(date, timeStr));
              setOpen(false);
            }}
            disabled={{ before: startOfDay(new Date()) }}
            dir="rtl"
          />
        </PopoverContent>
      </Popover>

      <TaskTimePicker
        value={timeStr}
        onChange={(t) => onChange(combine(value, t))}
        disabled={disabled || !value}
      />
    </div>
  );
}
