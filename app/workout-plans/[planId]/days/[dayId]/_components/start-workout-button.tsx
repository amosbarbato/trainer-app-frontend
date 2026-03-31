"use client";

import { useTransition } from "react";
import { Button } from "@/_components/ui/button";
import { startWorkoutAction } from "../_actions";

interface StartWorkoutButtonProps {
  workoutPlanId: string;
  workoutDayId: string;
}

export default function StartWorkoutButton({
  workoutPlanId,
  workoutDayId,
}: StartWorkoutButtonProps) {
  const [isPeding, startTransition] = useTransition();

  const handleStart = () => {
    startTransition(async () => {
      await startWorkoutAction(workoutPlanId, workoutDayId);
    });
  };

  return (
    <Button onClick={handleStart} disabled={isPeding} className="text-sm">
      Iniciar
    </Button>
  );
}
