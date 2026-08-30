import { toPersianDigits } from "@/lib/functions/toPersianDigits";

export default function AllTimeStatsWidget({
  stats,
}: {
  stats: { total: number; done: number; notDone: number; pending: number };
}) {
  const { total, done, notDone, pending } = stats;

  if (total === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
        <h2 className="text-lg font-bold text-foreground mb-1">
          نمای کلی همیشگی
        </h2>
        <p className="text-sm text-muted-foreground text-center py-10">
          هنوز آماری برای نمایش نیست
        </p>
      </div>
    );
  }

  const donePercent = Math.round((done / total) * 100);
  const notDonePercent = Math.round((notDone / total) * 100);
  const pendingPercent = 100 - donePercent - notDonePercent;

  const doneEnd = donePercent;
  const notDoneEnd = doneEnd + notDonePercent;

  const rows = [
    {
      label: "انجام‌شده",
      value: done,
      percent: donePercent,
      colorClass: "bg-primary",
    },
    {
      label: "انجام‌نشده",
      value: notDone,
      percent: notDonePercent,
      colorClass: "bg-destructive",
    },
    {
      label: "در انتظار",
      value: pending,
      percent: pendingPercent,
      colorClass: "bg-muted-foreground/40",
    },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="shrink-0 relative w-40 h-40">
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `conic-gradient(var(--primary) 0% ${doneEnd}%, var(--destructive) ${doneEnd}% ${notDoneEnd}%, color-mix(in srgb, var(--muted-foreground) 40%, transparent) ${notDoneEnd}% 100%)`,
          }}
        />
        <div className="absolute inset-[14%] rounded-full bg-card flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-foreground">
            {toPersianDigits(donePercent)}٪
          </span>
          <span className="text-xs text-muted-foreground mt-1">تکمیل‌شده</span>
        </div>
      </div>
      <div className="flex-1 w-full">
        <h2 className="text-lg font-bold text-foreground mb-1">
          نمای کلی همیشگی
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          همه‌ی وظایف شما از زمان عضویت
        </p>
        <div className="space-y-4">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-sm ${row.colorClass}`} />
                <span className="text-sm font-medium text-foreground">
                  {row.label}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-foreground">
                  {toPersianDigits(row.value)}
                </span>
                <span className="text-xs text-muted-foreground inline-block w-10 text-center">
                  {toPersianDigits(row.percent)}٪
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
          <span className="text-sm font-semibold text-muted-foreground">
            مجموع وظایف
          </span>
          <span className="text-xl font-bold text-foreground">
            {toPersianDigits(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
