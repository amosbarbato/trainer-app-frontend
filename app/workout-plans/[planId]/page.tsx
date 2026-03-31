import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/_lib/auth-client";
import { getWorkoutPlansWorkoutPlanId } from "@/_lib/api/fetch-generated";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/_components/ui/card";
import { Badge } from "@/_components/ui/badge";
import RestDayCard from "@/_components/rest-day-card";
import WorkoutDayCard from "@/_components/workout-day-card";
import BottomNav from "@/_components/bottom-nav";
import { Goal } from "lucide-react";

const WEEKDAY_ORDER = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export default async function WorkoutPlanPage({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  const session = await authClient.getSession({
    fetchOptions: { headers: await headers() },
  });

  if (!session.data?.user) redirect("/auth");

  const { planId } = await params;
  const workoutPlanData = await getWorkoutPlansWorkoutPlanId(planId);

  if (workoutPlanData.status !== 200) redirect("/");

  const { name, workoutDays } = workoutPlanData.data;

  const sortedDays = [...workoutDays].sort(
    (a, b) =>
      WEEKDAY_ORDER.indexOf(a.weekDay) - WEEKDAY_ORDER.indexOf(b.weekDay),
  );

  return (
    <div className="bg-background flex min-h-svh flex-col pb-24">
      <Card className="text-background relative h-74 overflow-hidden rounded-t-none rounded-b-4xl pb-10">
        <CardContent className="flex h-full shrink-0 flex-col justify-between">
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="/workout-plan-banner.png"
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

          <CardDescription className="text-background relative flex flex-col gap-3">
            <Badge className="text-primary-foreground">
              <Goal />
              <span className="font-heading text-xs font-semibold uppercase">
                {name}
              </span>
            </Badge>
            <h1 className="font-heading text-2xl leading-[1.05] font-semibold">
              Plano de Treino
            </h1>
          </CardDescription>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 p-5">
        {sortedDays.map((day) =>
          day.isRest ? (
            <RestDayCard key={day.id} weekDay={day.weekDay} />
          ) : (
            <Link key={day.id} href={`/workout-plans/${planId}/days/${day.id}`}>
              <WorkoutDayCard
                name={day.name}
                weekDay={day.weekDay}
                estimatedDurationInSeconds={day.estimatedDurationInSeconds}
                exercisesCount={day.exercisesCount}
                coverImageUrl={day.coverImageUrl}
              />
            </Link>
          ),
        )}
      </div>

      <BottomNav activePage="calendar" />
    </div>
  );
}
