import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { authClient } from "@/_lib/auth-client";
import { getMe } from "@/_lib/api/fetch-generated";
import { Card, CardContent } from "@/_components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/_components/ui/avatar";
import { Badge } from "@/_components/ui/badge";
import { LogoutButton } from "@/_components/logout-button";
import BottomNav from "@/_components/bottom-nav";
import { BicepsFlexed, Ruler, User, Weight } from "lucide-react";

export default async function Profile() {
  const session = await authClient.getSession({
    fetchOptions: { headers: await headers() },
  });

  if (!session.data?.user) redirect("/auth");

  const userData = await getMe();
  if (userData.status !== 200) {
    throw new Error("Não foi possível recuperar os dados do usuário.");
  }

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
          <Card className="bg-primary/8 ring-primary/15">
            <CardContent className="flex flex-col items-center gap-5">
              <Badge className="bg-primary/10 p-2.5">
                <Weight className="text-primary size-4" />
              </Badge>
              <div className="flex flex-col items-center gap-1.5">
                <span className="font-heading text-2xl leading-[1.15] font-semibold">
                  {weightInKg}
                </span>
                <span className="font-heading text-muted-foreground text-xs leading-[1.4]">
                  KG
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-primary/8 ring-primary/15">
            <CardContent className="flex flex-col items-center gap-5">
              <Badge className="bg-primary/10 p-2.5">
                <Ruler className="text-primary size-4" />
              </Badge>
              <div className="flex flex-col items-center gap-1.5">
                <span className="font-heading text-2xl leading-[1.15] font-semibold">
                  {heightInCm}
                </span>
                <span className="font-heading text-muted-foreground text-xs leading-[1.4]">
                  CM
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-primary/8 ring-primary/15">
            <CardContent className="flex flex-col items-center gap-5">
              <Badge className="bg-primary/10 p-2.5">
                <BicepsFlexed className="text-primary size-4" />
              </Badge>
              <div className="flex flex-col items-center gap-1.5">
                <span className="font-heading text-2xl leading-[1.15] font-semibold">
                  {bodyFatPercentage}%
                </span>
                <span className="font-heading text-muted-foreground text-xs leading-[1.4]">
                  GC
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-primary/8 ring-primary/15">
            <CardContent className="flex flex-col items-center gap-5">
              <Badge className="bg-primary/10 p-2.5">
                <User className="text-primary size-4" />
              </Badge>
              <div className="flex flex-col items-center gap-1.5">
                <span className="font-heading text-2xl leading-[1.15] font-semibold">
                  {age}
                </span>
                <span className="font-heading text-muted-foreground text-xs leading-[1.4]">
                  ANOS
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <LogoutButton />
      </div>

      <BottomNav activePage="profile" />
    </div>
  );
}
