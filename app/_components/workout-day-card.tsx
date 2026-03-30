import Image from "next/image";
import type { GetHomeData200TodayWorkoutDayWeekDay } from "@/_lib/api/fetch-generated";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, Dumbbell, Timer } from "lucide-react";

const WEEKDAY_LABELS: Record<string, string> = {
  MONDAY: "SEGUNDA",
  TUESDAY: "TERÇA",
  WEDNESDAY: "QUARTA",
  THURSDAY: "QUINTA",
  FRIDAY: "SEXTA",
  SATURDAY: "SÁBADO",
  SUNDAY: "DOMINGO",
};

interface WorkoutDayCardProps {
  name: string;
  weekDay: GetHomeData200TodayWorkoutDayWeekDay;
  estimatedDurationInSeconds: number;
  exercisesCount: number;
  coverImageUrl?: string;
}

export default function WorkoutDayCard({
  name,
  weekDay,
  estimatedDurationInSeconds,
  exercisesCount,
  coverImageUrl,
}: WorkoutDayCardProps) {
  const durationInMinutes = Math.round(estimatedDurationInSeconds / 60);

  return (
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
                {exercisesCount} exercícios
              </span>
            </div>
          </CardDescription>
        </CardHeader>
      </CardContent>
    </Card>
  );
}
