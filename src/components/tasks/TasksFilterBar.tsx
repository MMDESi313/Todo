"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export type StatusFilter = "ALL" | "TODO" | "DONE" | "NOT_DONE";
export type PriorityFilter = "ALL" | "LOW" | "MEDIUM" | "HIGH";

const STATUS_ITEMS = [
  { label: "همه وضعیت‌ها", value: "ALL" },
  { label: "در انتظار", value: "TODO" },
  { label: "انجام‌شده", value: "DONE" },
  { label: "انجام‌نشده", value: "NOT_DONE" },
];

const PRIORITY_ITEMS = [
  { label: "همه اولویت‌ها", value: "ALL" },
  { label: "کم", value: "LOW" },
  { label: "متوسط", value: "MEDIUM" },
  { label: "زیاد", value: "HIGH" },
];

export default function TasksFilterBar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  status: StatusFilter;
  onStatusChange: (v: StatusFilter) => void;
  priority: PriorityFilter;
  onPriorityChange: (v: PriorityFilter) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <Search
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="جستجو بر اساس عنوان..."
          className="pr-9"
        />
      </div>
      <Select
        items={STATUS_ITEMS}
        value={status}
        onValueChange={(v) => onStatusChange(v as StatusFilter)}
      >
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>همه وضعیت ها</SelectLabel>
            {STATUS_ITEMS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        items={PRIORITY_ITEMS}
        value={priority}
        onValueChange={(v) => onPriorityChange(v as PriorityFilter)}
      >
        <SelectTrigger className="w-full sm:w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>اولویت ها</SelectLabel>
            {PRIORITY_ITEMS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
