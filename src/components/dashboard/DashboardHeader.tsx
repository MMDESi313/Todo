import { toIranDate } from "@/lib/functions/date";
import { Tag } from "@prisma/client";
import { format } from "date-fns-jalali";
import AddTaskDialog from "../tasks/AddTaskDialog";
import { toPersianDigits } from "@/lib/functions/toPersianDigits";

export default function DashboardHeader({
  name,
  pending,
  tags,
}: {
  name: string;
  pending: number;
  tags: Tag[];
}) {
  const today = toIranDate(new Date());

  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          سلام {name} 👋
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {toPersianDigits(format(today, "EEEE d MMMM yyyy"))} ·{" "}
          {pending > 0
            ? `${toPersianDigits(pending)} وظیفه‌ی باقیمانده برای امروز`
            : "امروز کاری برات باقی نمونده"}
        </p>
      </div>
      <AddTaskDialog tags={tags} />
    </div>
  );
}
