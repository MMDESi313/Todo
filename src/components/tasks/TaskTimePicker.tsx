"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import WheelPicker from "./WheelPicker";
import { toPersianDigits } from "@/lib/functions/toPersianDigits";

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);

export default function TaskTimePicker({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (time: string) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [hour, minute] = value.split(":");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={(props) => (
          <Button
            {...props}
            type="button"
            variant="outline"
            disabled={disabled}
            className="w-28 justify-start gap-2 font-normal"
          >
            <Clock size={16} />
            {toPersianDigits(value)}
          </Button>
        )}
      />
      <PopoverContent align="start" className="w-auto p-3">
        <div className="flex items-center gap-1">
          <WheelPicker
            items={MINUTES}
            value={minute}
            onChange={(m) => onChange(`${hour}:${m}`)}
            disabled={disabled}
          />
          <span className="text-lg font-bold text-muted-foreground pb-1">
            :
          </span>
          <WheelPicker
            items={HOURS}
            value={hour}
            onChange={(h) => onChange(`${h}:${minute}`)}
            disabled={disabled}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
