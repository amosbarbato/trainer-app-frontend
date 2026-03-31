import type { GetWorkoutPlans200ItemWorkoutDaysItemExercisesItem } from "@/_lib/api/fetch-generated";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { CircleHelp, Zap } from "lucide-react";

interface ExerciseCardProps {
  exercise: GetWorkoutPlans200ItemWorkoutDaysItemExercisesItem;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col justify-between gap-3">
        <CardHeader className="flex items-center justify-between p-0">
          <CardTitle className="font-heading leading-relaxed font-semibold">
            {exercise.name}
          </CardTitle>
          <Button variant="link" size="icon">
            <CircleHelp className="text-muted-foreground size-5" />
          </Button>
        </CardHeader>
        <CardDescription className="flex items-center gap-1.5">
          <Badge
            variant="secondary"
            className="font-heading text-xs font-semibold uppercase"
          >
            {exercise.sets} séries
          </Badge>
          <Badge
            variant="secondary"
            className="font-heading text-xs font-semibold uppercase"
          >
            {exercise.reps} reps
          </Badge>
          <Badge
            variant="secondary"
            className="font-heading space-y-1 text-xs font-semibold uppercase"
          >
            <Zap className="size-3.5" />
            {exercise.restTimeInSeconds}s
          </Badge>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
