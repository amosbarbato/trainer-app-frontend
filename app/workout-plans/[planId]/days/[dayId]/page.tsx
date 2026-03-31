import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { authClient } from "@/_lib/auth-client";
import { getWorkoutPlansWorkoutPlanIdDaysWorkoutDayId } from "@/_lib/api/fetch-generated";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/_components/ui/card";
import { BackButton } from "@/_components/back-button";
import ExerciseCard from "@/_components/exercise-card";
import { Badge } from "@/_components/ui/badge";
import { Button } from "@/_components/ui/button";
import StartWorkoutButton from "./_components/start-workout-button";
import CompleteWorkoutButton from "./_components/complete-workout-button";
import BottomNav from "@/_components/bottom-nav";
import { Calendar, Dumbbell, Timer } from "lucide-react";

const WEEKDAY_LABELS: Record<string, string> = {
  MONDAY: "Segunda",
  TUESDAY: "Terça",
  WEDNESDAY: "Quarta",
  THURSDAY: "Quinta",
  FRIDAY: "Sexta",
  SATURDAY: "Sábado",
  SUNDAY: "Domingo",
};

export default async function WorkoutDayPage({
  params,
}: {
  params: Promise<{ planId: string; dayId: string }>;
}) {
  const session = await authClient.getSession({
    fetchOptions: { headers: await headers() },
  });

  if (!session.data?.user) redirect("/auth");

  const { planId: workoutPlanId, dayId } = await params;
  const workoutDayData = await getWorkoutPlansWorkoutPlanIdDaysWorkoutDayId(
    workoutPlanId,
    dayId,
  );

  if (workoutDayData.status !== 200) redirect("/");

  const {
    name,
    weekDay,
    estimatedDurationInSeconds,
    exercises,
    sessions,
    coverImageUrl,
  } = workoutDayData.data;

  const durationInMinutes = Math.round(estimatedDurationInSeconds / 60);
  const exerciseCount = exercises.length;

  const inProgressSession = sessions.find((s) => s.startedAt && !s.completedAt);
  const completedSession = sessions.find((s) => s.completedAt);
  const hasInProgressSession = !!inProgressSession;
  const hasCompletedSession = !!completedSession;

  return (
    <div className="bg-background flex min-h-svh flex-col pb-28">
      <div className="text-foreground flex items-center justify-between px-5 py-4">
        <BackButton />
        <h1 className="font-heading text-lg font-semibold">
          {hasInProgressSession || hasCompletedSession
            ? "Treino de Hoje"
            : WEEKDAY_LABELS[weekDay]}
        </h1>
        <div className="size-6" />
      </div>

      <div className="space-y-5 px-5">
        <Card className="text-background relative h-50 overflow-hidden">
          <CardContent className="flex h-full shrink-0 flex-col justify-between">
            {coverImageUrl && (
              <Image
                src={coverImageUrl}
                alt={name}
                fill
                className="object-cover"
                priority
              />
            )}

            <div className="bg-foreground/40 absolute inset-0" />

            <div className="relative">
              <Badge variant="ghost">
                <Calendar className="size-3.5" />
                <span className="font-heading text-xs font-semibold uppercase">
                  {WEEKDAY_LABELS[weekDay]}
                </span>
              </Badge>
            </div>
            <CardHeader className="relative p-0">
              <div className="flex items-end justify-between">
                <div className="space-y-2">
                  <CardTitle className="font-heading text-2xl leading-[1.05] font-semibold">
                    {name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <div className="text-background/70 flex items-center gap-1">
                      <Timer className="size-3.5" />
                      <span className="font-heading text-xs">
                        {durationInMinutes}min
                      </span>
                    </div>
                    <div className="text-background/70 flex items-center gap-1">
                      <Dumbbell className="size-3.5" />
                      <span className="font-heading text-xs">
                        {exerciseCount} exercícios
                      </span>
                    </div>
                  </CardDescription>
                </div>

                {!hasInProgressSession && !hasCompletedSession && (
                  <StartWorkoutButton
                    workoutPlanId={workoutPlanId}
                    workoutDayId={dayId}
                  />
                )}

                {hasCompletedSession && (
                  <Button disabled variant="ghost">
                    Concluído!
                  </Button>
                )}
              </div>
            </CardHeader>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-5">
          {exercises
            .sort((a, b) => a.order - b.order)
            .map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
        </div>
      </div>

      {hasInProgressSession && inProgressSession && (
        <div className="px-5 pt-5">
          <CompleteWorkoutButton
            workoutPlanId={workoutPlanId}
            workoutDayId={dayId}
            sessionId={inProgressSession.id}
          />
        </div>
      )}

      <BottomNav activePage="calendar" />
    </div>
  );
}
