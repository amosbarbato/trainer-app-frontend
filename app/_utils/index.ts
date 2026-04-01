import type dayjs from "dayjs";

interface WeekData {
  dates: dayjs.Dayjs[];
}

export interface MonthGroup {
  label: string;
  weeks: WeekData[];
}

function getWeekDates(today: dayjs.Dayjs) {
  const monday =
    today.day() === 0
      ? today.subtract(6, "day")
      : today.subtract(today.day() - 1, "day");

  return Array.from({ length: 7 }, (_, i) => monday.add(i, "day"));
}

function getMonday(date: dayjs.Dayjs): dayjs.Dayjs {
  const day = date.day();
  if (day === 0) return date.subtract(6, "day");
  return date.subtract(day - 1, "day");
}

function buildMonthGroups(today: dayjs.Dayjs): MonthGroup[] {
  const startOfRange = today.subtract(2, "month").startOf("month");
  const endOfRange = today.endOf("month");

  const firstMonday = getMonday(startOfRange);
  const lastMonday = getMonday(endOfRange);
  const lastSunday = lastMonday.add(6, "day");

  const allWeeks: WeekData[] = [];
  let currentMonday = firstMonday;

  while (
    currentMonday.isBefore(lastSunday) ||
    currentMonday.isSame(lastSunday)
  ) {
    const dates = Array.from({ length: 7 }, (_, i) =>
      currentMonday.add(i, "day"),
    );
    allWeeks.push({ dates });
    currentMonday = currentMonday.add(7, "day");
  }

  const monthGroups: MonthGroup[] = [];
  const monthLabels = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  for (const week of allWeeks) {
    const thursday = week.dates[3];
    const monthIndex = thursday.month();
    const monthLabel = monthLabels[monthIndex];

    const lastGroup = monthGroups[monthGroups.length - 1];

    if (lastGroup && lastGroup.label === monthLabel) {
      lastGroup.weeks.push(week);
    } else {
      monthGroups.push({ label: monthLabel, weeks: [week] });
    }
  }

  return monthGroups;
}

function formatTotalTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}h${minutes.toString().padStart(2, "0")}m`;
}

export { getWeekDates, buildMonthGroups, formatTotalTime };
