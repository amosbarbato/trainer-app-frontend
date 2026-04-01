import { headers } from "next/headers";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import { authClient } from "@/_lib/auth-client";
import { getHomeData, getMe } from "@/_lib/api/fetch-generated";
import { Avatar, AvatarFallback, AvatarImage } from "@/_components/ui/avatar";
import { StatCard } from "@/_components/stat-card";
import { LogoutButton } from "@/_components/logout-button";
import BottomNav from "@/_components/bottom-nav";
import { BicepsFlexed, Ruler, User, Weight } from "lucide-react";

export default async function Profile() {
  const session = await authClient.getSession({
    fetchOptions: { headers: await headers() },
  });

  if (!session.data?.user) redirect("/auth");

  const [userData, homeData] = await Promise.all([
    getMe(),
    getHomeData(dayjs().format("YYYY-MM-DD")),
  ]);

  if (userData.status !== 200) {
    throw new Error("Não foi possível recuperar os dados do usuário.");
  }

  const needsOnboarding =
    (homeData.status === 200 && !homeData.data.activeWorkoutPlanId) ||
    !userData.data;
  if (needsOnboarding) redirect("/onboarding");

  const user = session.data.user;
  const data = userData.data;

  const weightInKg = data ? data.weightInGrams / 1000 : null;
  const heightInCm = data?.heightInCentimeters ?? null;
  const bodyFatPercentage = data?.bodyFatPercentage ?? null;
  const age = data?.age ?? null;

  return (
    <div className="bg-background flex min-h-svh flex-col pb-24">
      <div className="flex h-14 items-center px-5">
        <h2 className="font-anton relative z-10 text-[22px]">FIT.AI</h2>
      </div>

      <div className="flex flex-col items-center gap-5 px-5 pt-5">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-13">
              <AvatarImage src={user.image ?? undefined} alt={user.name} />
              <AvatarFallback className="text-lg">
                {user.name?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1.5">
              <h1 className="font-heading text-lg leading-[1.05] font-semibold">
                {user.name}
              </h1>
              <p className="font-heading text-foreground/70 text-sm leading-[1.15]">
                Plano Básico
              </p>
            </div>
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-3">
          <StatCard icon={Weight} value={String(weightInKg)} label="KG" />
          <StatCard icon={Ruler} value={String(heightInCm)} label="CM" />
          <StatCard
            icon={BicepsFlexed}
            value={`${String(bodyFatPercentage)}%`}
            label="GC"
          />
          <StatCard icon={User} value={String(age)} label="ANOS" />
        </div>

        <LogoutButton />
      </div>

      <BottomNav activePage="profile" />
    </div>
  );
}
