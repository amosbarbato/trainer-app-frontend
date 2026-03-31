"use client";

import { useTransition } from "react";
import { Button } from "@/_components/ui/button";
import { completeWorkoutAction } from "../_actions";

interface CompleteWorkoutButtonProps {
  workoutPlanId: string;
  workoutDayId: string;
  sessionId: string;
}

export default function CompleteWorkoutButton({
  workoutPlanId,
  workoutDayId,
  sessionId,
}: CompleteWorkoutButtonProps) {
  const [isPeding, startTransition] = useTransition();

  const handleComplete = () => {
    console.log(`plan id: ${workoutPlanId}`);
    console.log(`day id: ${workoutDayId}`);
    console.log(`session id: ${sessionId}`);

    startTransition(async () => {
      await completeWorkoutAction(workoutPlanId, workoutDayId, sessionId);
    });
  };

  return (
    <Button
      variant="outline"
      onClick={handleComplete}
      disabled={isPeding}
      className="w-full text-sm"
    >
      Marcar como concluído
    </Button>
  );
}
