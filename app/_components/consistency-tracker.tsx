import type dayjs from "dayjs";
import type { GetHomeData200ConsistencyByDay } from "@/_lib/api/fetch-generated";
import { getWeekDates } from "@/_utils";
import ConsistencySquare from "./consistency-square";

const WEEKDAY_SHORT = ["S", "T", "Q", "Q", "S", "S", "D"];

interface ConsistencyTrackerProps {
  consistencyByDay: GetHomeData200ConsistencyByDay;
  today: dayjs.Dayjs;
}

export default function ConsistencyTracker({
  consistencyByDay,
  today,
}: ConsistencyTrackerProps) {
  const weekDates = getWeekDates(today);
  const todayStr = today.format("YYYY-MM-DD");

  return (
    <div className="flex items-center justify-between">
      {weekDates.map((date, index) => {
        const dateStr = date.format("YYYY-MM-DD");
        const dayData = consistencyByDay[dateStr] ?? {
          workoutDayCompleted: false,
          workoutDayStarted: false,
        };

        return (
          <div key={dateStr} className="flex flex-col items-center gap-1.5">
            <ConsistencySquare
              completed={dayData.workoutDayCompleted}
              started={dayData.workoutDayStarted}
              isToday={dateStr === todayStr}
            />

            <span className="font-heading text-muted-foreground text-xs">
              {WEEKDAY_SHORT[index]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
