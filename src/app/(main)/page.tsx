import AllTimeStatsWidget from "@/components/dashboard/AllTimeStatsWidget";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Last7DaysWidget from "@/components/dashboard/Last7DaysWidget";
import TodayStatWidget from "@/components/dashboard/TodayStatWidget";
import UpcomingTasksWidget from "@/components/dashboard/UpcomingTasksWidget";
import OverdueWidget from "@/components/tasks/OverdueWidget";
import { getCurrentUser } from "@/lib/auth/session";
import {
  getAllTimeStats,
  getLast7DaysStats,
  getOverdueTasks,
  getTodayStats,
  getUpcomingTasksToday,
} from "@/lib/dashboard";
import getUserTags from "@/lib/tags";

export default async function HomePage() {
  const user = await getCurrentUser();

  const [tags, todayStats, upcoming, overdue, last7Days, allTime] =
    await Promise.all([
      getUserTags(user!.id),
      getTodayStats(user!.id),
      getUpcomingTasksToday(user!.id),
      getOverdueTasks(user!.id),
      getLast7DaysStats(user!.id),
      getAllTimeStats(user!.id),
    ]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="max-w-5xl mx-auto space-y-6">
        <DashboardHeader
          name={user!.name}
          pending={todayStats.pending}
          tags={tags}
        />
        <TodayStatWidget stats={todayStats} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingTasksWidget
            tasks={upcoming.tasks}
            total={upcoming.total}
            tags={tags}
          />
          <OverdueWidget
            tasks={overdue.tasks}
            total={overdue.total}
            tags={tags}
          />
        </div>
        <Last7DaysWidget days={last7Days} />
        <AllTimeStatsWidget stats={allTime} />
      </div>
    </div>
  );
}
