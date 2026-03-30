import Image from "next/image";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { authClient } from "@/_lib/auth-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/_components/ui/card";
import SignInWithGoogle from "@/_components/sign-in-with-google";

export default async function AuthPage() {
  const session = await authClient.getSession({
    fetchOptions: { headers: await headers() },
  });

  if (session.data?.user) redirect("/");

  return (
    <div className="text-background relative flex flex-1 flex-col items-center justify-between">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <Image
          src="/login-bg.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      <h1 className="font-anton relative z-10 pt-12 text-center text-[38px]">
        FIT.AI
      </h1>

      <Card className="bg-primary relative z-10 w-full gap-15 rounded-t-4xl rounded-b-none px-14 pt-12 pb-10 leading-[1.05]">
        <CardHeader className="justify-center gap-6">
          <CardTitle className="text-background text-center text-[32px] font-semibold">
            O app que vai transformar a forma como você treina.
          </CardTitle>

          <CardDescription className="flex justify-center">
            <SignInWithGoogle />
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="font-heading text-primary-foreground/70 text-center text-xs leading-[1.4]">
            ©2026 Copyright FIT.AI. Todos os direitos reservados
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
