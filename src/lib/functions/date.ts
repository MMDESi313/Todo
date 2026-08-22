import { TZDate } from "@date-fns/tz";
import { endOfDay, isValid, parseISO, startOfDay } from "date-fns";
import { format } from "date-fns-jalali";

export const IRAN_TZ = "Asia/Tehran";

export function toIranDate(date: Date) {
  return new TZDate(date, IRAN_TZ);
}

export function formatTaskDate(date: Date) {
  return format(toIranDate(date), "d MMMM yyyy - HH:mm");
}

export function getIranDayRange(date: Date) {
  const iran = toIranDate(date);
  return {
    start: new Date(startOfDay(iran)),
    end: new Date(endOfDay(iran)),
  };
}

export function parseDateParam(param: string | undefined): Date {
  if (!param) return new Date();
  const parsed = parseISO(param);
  return isValid(parsed) ? parsed : new Date();
}
