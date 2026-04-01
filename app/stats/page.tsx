import { headers } from "next/headers";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import { authClient } from "@/_lib/auth-client";
import { getHomeData, getMe, getStats } from "@/_lib/api/fetch-generated";
import { formatTotalTime } from "@/_utils";
import { StreakBanner } from "./_components/streak-banner";
import { StatsHeatmap } from "./_components/stats-heatmap";
import { StatCard } from "@/_components/stat-card";
import BottomNav from "@/_components/bottom-nav";
import { CircleCheck, CirclePercent, Hourglass } from "lucide-react";

export default async function StatsPage() {
  const session = await authClient.getSession({
    fetchOptions: { headers: await headers() },
  });

  if (!session.data?.user) redirect("/auth");

  const today = dayjs();
  const from = today.subtract(2, "month").startOf("month").format("YYYY-MM-DD");
  const to = today.endOf("month").format("YYYY-MM-DD");

  const [statsResponse, homeData, userData] = await Promise.all([
    getStats({ from, to }),
    getHomeData(today.format("YYYY-MM-DD")),
    getMe(),
  ]);

  const needsOnboarding =
    (homeData.status === 200 && !homeData.data.activeWorkoutPlanId) ||
    (userData.status === 200 && !userData.data);
  if (needsOnboarding) redirect("/onboarding");

  if (statsResponse.status !== 200) {
    throw new Error("Failed to fetch stats");
  }

  const {
    workoutStreak,
    consistencyByDay,
    completedWorkoutsCount,
    conclusionRate,
    totalTimeInSeconds,
  } = statsResponse.data;

  return (
    <div className="bg-background flex min-h-svh flex-col pb-24">
      <div className="flex h-14 items-center px-5">
        <h2 className="font-anton relative z-10 text-[22px]">FIT.AI</h2>
      </div>

      <div className="px-5">
        <StreakBanner workoutStreak={workoutStreak} />
      </div>

      <div className="flex flex-col gap-3 p-5">
        <h2 className="font-heading text-foreground text-lg font-semibold">
          Consistência
        </h2>

        <StatsHeatmap consistencyByDay={consistencyByDay} today={today} />

        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={CircleCheck}
            value={String(completedWorkoutsCount)}
            label="Treinos Feitos"
          />
          <StatCard
            icon={CirclePercent}
            value={`${Math.round(conclusionRate * 100)}%`}
            label="Taxa de conclusão"
          />
        </div>

        <StatCard
          icon={Hourglass}
          value={formatTotalTime(totalTimeInSeconds)}
          label="Tempo Total"
        />
      </div>

      <BottomNav activePage="stats" />
    </div>
  );
}
