import { toIranDate } from "@/lib/functions/date";
import { toPersianDigits } from "@/lib/functions/toPersianDigits";
import { isSameDay } from "date-fns";
import { format } from "date-fns-jalali";

export default function Last7DaysWidget({
  days,
}: {
  days: { date: Date; total: number; done: number }[];
}) {
  const totalDone = days.reduce((sum, d) => sum + d.done, 0);
  const totalAll = days.reduce((sum, d) => sum + d.total, 0);

  return (
    <div className="bg-card border border-border rounded-xl p-5 md:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-foreground">۷ روز گذشته</h2>
        <span className="text-xs text-muted-foreground">
          {toPersianDigits(totalDone)} از {toPersianDigits(totalAll)} وظیفه
          انجام شده
        </span>
      </div>
      <div className="grid grid-cols-7 gap-2 md:gap-4">
        {days.map((day) => {
          const isToday = isSameDay(day.date, new Date());
          const percent =
            day.total === 0 ? 0 : Math.round((day.done / day.total) * 100);
          return (
            <div
              key={day.date.toISOString()}
              className="flex flex-col items-center gap-2"
            >
              <span
                className={`text-[11px] font-semibold ${isToday ? "text-primary" : "text-muted-foreground"}`}
              >
                {day.total > 0
                  ? `${toPersianDigits(day.done)}/${toPersianDigits(day.total)}`
                  : "-"}
              </span>
              <div className="w-full h-28 bg-muted rounded-lg flex flex-col justify-end overflow-hidden">
                <div
                  className="w-full bg-primary rounded-lg transition-all"
                  style={{ height: `${percent}%` }}
                />
              </div>
              <span
                className={`text-xs font-medium ${isToday ? "text-primary font-bold" : "text-muted-foreground"}`}
              >
                {toPersianDigits(format(toIranDate(day.date), "EEEEEE"))}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
