import type dayjs from "dayjs";
import { useHeatmap } from "@/_hooks/use-heatmap";
import type { GetStats200ConsistencyByDay } from "@/_lib/api/fetch-generated";
import ConsistencySquare from "../../_components/consistency-square";

interface StatsHeatmapProps {
  consistencyByDay: GetStats200ConsistencyByDay;
  today: dayjs.Dayjs;
}

export function StatsHeatmap({ consistencyByDay, today }: StatsHeatmapProps) {
  const { monthGroups, getDayStatus } = useHeatmap({ today });

  return (
    <div className="border-border flex gap-1 overflow-x-auto rounded-xl border p-5">
      {monthGroups.map((group) => (
        <div key={group.label} className="flex flex-col gap-1.5">
          <p className="font-heading text-muted-foreground text-xs">
            {group.label}
          </p>

          <div className="flex gap-1">
            {group.weeks.map((week) => {
              const weekKey = week.dates[0].format("YYYY-MM-DD");

              return (
                <div key={weekKey} className="flex flex-col gap-1">
                  {week.dates.map((date) => {
                    const status = getDayStatus(date, consistencyByDay);

                    return (
                      <ConsistencySquare
                        key={date.toString()}
                        completed={status.completed}
                        started={status.started}
                        isToday={status.isToday}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
