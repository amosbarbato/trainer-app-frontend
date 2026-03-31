import Link from "next/link";
import dayjs from "dayjs";
import { cn } from "@/_lib/utils";
import { getHomeData } from "@/_lib/api/fetch-generated";
import { Button } from "./ui/button";
import {
  Calendar,
  ChartNoAxesColumn,
  House,
  Sparkles,
  UserRound,
} from "lucide-react";

interface BottomNavProps {
  activePage?: "home" | "calendar" | "stats" | "profile";
}

export default async function BottomNav({
  activePage = "home",
}: BottomNavProps) {
  const today = dayjs();
  const homeData = await getHomeData(today.format("YYYY-MM-DD"));

  const calendarHref =
    homeData.status === 200 && homeData.data.activeWorkoutPlanId
      ? `workout-plans/${homeData.data.activeWorkoutPlanId}`
      : null;

  return (
    <nav className="border-border bg-background fixed right-0 bottom-0 left-0 z-50 flex items-center justify-center gap-6 rounded-t-4xl border px-6 py-4">
      <Link href="/" className="p-3">
        <House
          className={cn(
            "size-6",
            activePage === "home" ? "text-foreground" : "text-muted-foreground",
          )}
        />
      </Link>

      {calendarHref ? (
        <Link href={calendarHref} className="p-3">
          <Calendar
            className={cn(
              "size-6",
              activePage === "calendar"
                ? "text-foreground"
                : "text-muted-foreground",
            )}
          />
        </Link>
      ) : (
        <button className="p-3">
          <Calendar
            className={cn(
              "size-6",
              activePage === "calendar"
                ? "text-foreground"
                : "text-muted-foreground",
            )}
          />
        </button>
      )}

      <Button className="h-auto rounded-full p-4">
        <Sparkles className="size-6" />
      </Button>

      <Link href="/" className="p-3">
        <ChartNoAxesColumn
          className={cn(
            "size-6",
            activePage === "stats"
              ? "text-foreground"
              : "text-muted-foreground",
          )}
        />
      </Link>

      <Link href="/profile" className="p-3">
        <UserRound
          className={cn(
            "size-6",
            activePage === "profile"
              ? "text-foreground"
              : "text-muted-foreground",
          )}
        />
      </Link>
    </nav>
  );
}
