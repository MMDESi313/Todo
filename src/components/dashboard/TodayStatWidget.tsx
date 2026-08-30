import { toPersianDigits } from "@/lib/functions/toPersianDigits";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";

export default function TodayStatWidget({
  stats,
}: {
  stats: {
    total: number;
    done: number;
    notDone: number;
    pending: number;
    progressPercent: number;
  };
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 md:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">وضعیت امروز</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-8 gap-4 md:gap-0">
        <div className="grid grid-cols-4 text-center gap-3 md:col-span-3">
          <div>
            <p className="text-xl font-bold text-foreground">
              {toPersianDigits(stats.total)}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">کل وظایف</p>
          </div>
          <div>
            <p className="text-xl font-bold text-primary">
              {toPersianDigits(stats.done)}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">انجام‌شده</p>
          </div>
          <div>
            <p className="text-xl font-bold text-destructive">
              {toPersianDigits(stats.notDone)}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">انجام‌نشده</p>
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">
              {toPersianDigits(stats.pending)}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">در انتظار</p>
          </div>
        </div>
        <div className="md:col-span-4 md:col-start-5 self-center">
          <div className="flex justify-between">
            <span className="text-sm font-semibold text-muted-foreground">
              پیشرفت
            </span>
            <span className="text-sm font-semibold text-primary">
              {toPersianDigits(stats.progressPercent)}٪
            </span>
          </div>
          <Progress value={stats.progressPercent} className="mt-1" />
        </div>
      </div>
    </div>
  );
}
