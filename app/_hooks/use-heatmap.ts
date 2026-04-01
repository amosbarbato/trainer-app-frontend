import { useMemo } from "react";
import type dayjs from "dayjs";
import type { GetStats200ConsistencyByDay } from "@/_lib/api/fetch-generated";
import { buildMonthGroups, type MonthGroup } from "@/_utils";

type DayStatus = {
  completed: boolean;
  started: boolean;
  isToday: boolean;
};

interface UseHeatmapProps {
  today: dayjs.Dayjs;
}

interface UseHeatmapReturn {
  monthGroups: MonthGroup[];
  getDayStatus: (
    date: dayjs.Dayjs,
    consistencyByDay: GetStats200ConsistencyByDay,
  ) => DayStatus;
}

export function useHeatmap({ today }: UseHeatmapProps): UseHeatmapReturn {
  const monthGroups = useMemo(() => {
    return buildMonthGroups(today);
  }, [today]);

  function getDayStatus(date: dayjs.Dayjs, consistencyByDay: any) {
    const dateStr = date.format("YYYY-MM-DD");
    const dayData = consistencyByDay[dateStr];

    return {
      completed: !!dayData?.workoutDayCompleted,
      started: !!dayData?.workoutDayStarted,
      isToday: date.isSame(today, "day"),
    };
  }

  return {
    monthGroups,
    getDayStatus,
  };
}
