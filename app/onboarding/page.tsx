import { headers } from "next/headers";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import { authClient } from "@/_lib/auth-client";
import { getHomeData, getMe } from "@/_lib/api/fetch-generated";

export default async function onboarding() {
  const session = await authClient.getSession({
    fetchOptions: { headers: await headers() },
  });

  if (!session.data?.user) redirect("/auth");

  const [homeData, userData] = await Promise.all([
    getHomeData(dayjs().format("YYYY-MM-DD")),
    getMe(),
  ]);

  if (
    homeData.status === 200 &&
    userData.status === 200 &&
    homeData.data.activeWorkoutPlanId &&
    userData.data
  ) {
    redirect("/");
  }

  return <h1>Onboarding page</h1>;
}
