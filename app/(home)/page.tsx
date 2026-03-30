import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { authClient } from "@/_lib/auth-client";

export default async function Home() {
  const session = await authClient.getSession({
    fetchOptions: { headers: await headers() },
  });

  if (!session.data?.user) redirect("/auth");

  return (
    <div className="">
      <h1 className="">Deu certo</h1>
    </div>
  );
}
