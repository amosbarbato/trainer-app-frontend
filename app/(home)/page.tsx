import Image from "next/image";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import dayjs from "dayjs";
import { authClient } from "@/_lib/auth-client";
import { getHomeData } from "@/_lib/api/fetch-generated";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/_components/ui/card";
import { Badge } from "@/_components/ui/badge";
import ConsistencyTracker from "@/_components/consistency-tracker";
import WorkoutDayCard from "@/_components/workout-day-card";
import BottomNav from "@/_components/bottom-nav";
import { Flame } from "lucide-react";

export default async function Home() {
  const session = await authClient.getSession({
    fetchOptions: { headers: await headers() },
  });

  if (!session.data?.user) redirect("/auth");

  const today = dayjs();
  const homeData = await getHomeData(today.format("YYYY-MM-DD"));

  if (homeData.status !== 200) redirect("/auth");

  const { consistencyByDay, workoutStreak, todayWorkoutDay } = homeData.data;
  const userName = session.data.user.name?.split(" ")[0] ?? "";

  return (
    <div className="bg-background flex min-h-svh flex-col pb-24">
      <Card className="text-background relative h-74 overflow-hidden rounded-t-none rounded-b-4xl pb-10">
        <CardContent className="flex h-full shrink-0 flex-col justify-between">
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="/home-banner.png"
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(243deg, rgba(0,0,0,0) 34%, rgb(0,0,0) 100%)",
              }}
            />
          </div>

          <CardTitle className="font-anton relative z-10 text-[22px]">
            FIT.AI
          </CardTitle>

          <CardDescription className="text-background relative flex items-end justify-between">
            <div className="flex flex-col gap-1.5">
              <h1 className="font-heading text-2xl leading-[1.05] font-semibold">
                Olá, {userName}
              </h1>
              <p className="font-heading text-background/70 text-sm leading-[1.15]">
                Bora treinar hoje?
              </p>
            </div>
            <Badge className="font-heading text-primary-foreground px-4 py-2 text-sm font-semibold">
              Bora!
            </Badge>
          </CardDescription>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 px-5 pt-5">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-foreground text-lg font-semibold">
            Consistência
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Card className="flex-1">
            <CardContent>
              <ConsistencyTracker
                consistencyByDay={consistencyByDay}
                today={today}
              />
            </CardContent>
          </Card>

          <div className="bg-streak flex items-center gap-2 self-stretch rounded-xl px-5 py-2">
            <Flame className="text-streak-foreground fill-streak-foreground size-5" />
            <span className="font-heading text-foreground text-base font-semibold">
              {workoutStreak}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-foreground text-lg font-semibold">
            Treino de Hoje
          </h2>
        </div>

        {todayWorkoutDay ? (
          <WorkoutDayCard
            name={todayWorkoutDay.name}
            weekDay={todayWorkoutDay.weekDay}
            estimatedDurationInSeconds={
              todayWorkoutDay.estimatedDurationInSeconds
            }
            exercisesCount={todayWorkoutDay.exercisesCount}
            coverImageUrl={todayWorkoutDay.coverImageUrl}
          />
        ) : (
          <p className="text-muted-foreground text-center text-sm">
            Você ainda não tem treino para hoje.
          </p>
        )}
      </div>

      <BottomNav activePage="home" />
    </div>
  );
}
