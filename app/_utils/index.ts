import type dayjs from "dayjs";

function getWeekDates(today: dayjs.Dayjs) {
  const monday =
    today.day() === 0
      ? today.subtract(6, "day")
      : today.subtract(today.day() - 1, "day");

  return Array.from({ length: 7 }, (_, i) => monday.add(i, "day"));
}

export { getWeekDates };
