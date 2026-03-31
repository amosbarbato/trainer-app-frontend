import Link from "next/link";
import { cn } from "@/_lib/utils";
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

      <Link href="/" className="p-3">
        <Calendar
          className={cn(
            "size-6",
            activePage === "calendar"
              ? "text-foreground"
              : "text-muted-foreground",
          )}
        />
      </Link>

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
