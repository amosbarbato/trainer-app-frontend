import Image from "next/image";
import { Flame } from "lucide-react";

interface StreakBannerProps {
  workoutStreak: number;
}

export function StreakBanner({ workoutStreak }: StreakBannerProps) {
  const isZero = workoutStreak === 0;

  return (
    <div className="relative flex flex-col items-center justify-center gap-6 overflow-hidden rounded-xl px-5 py-10">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/stats-banner.png"
          alt=""
          fill
          className={`object-cover ${isZero ? "grayscale" : ""}`}
          priority
        />
      </div>
      <div className="relative flex flex-col items-center gap-3">
        <div className="border-background/12 bg-background/12 rounded-full border p-3 backdrop-blur-xs">
          <Flame className="text-streak-foreground fill-streak-foreground size-8" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="font-heading text-background text-5xl leading-[0.95] font-semibold">
            {workoutStreak} dias
          </p>
          <p className="font-heading text-background/60 text-base leading-[1.15]">
            Sequência Atual
          </p>
        </div>
      </div>
    </div>
  );
}
