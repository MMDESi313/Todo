import { TZDate } from "@date-fns/tz";
import { format } from "date-fns-jalali";

export const IRAN_TZ = "Asia/Tehran";

export function toIranDate(date: Date) {
  return new TZDate(date, IRAN_TZ);
}

export function formatTaskDate(date: Date) {
  return format(toIranDate(date), "d MMMM yyyy - HH:mm");
}
