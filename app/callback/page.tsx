"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/_lib/auth-client";
import { Loader2 } from "lucide-react";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function handleAuth() {
      const session = await authClient.getSession();

      if (session.data?.user) {
        router.replace("/");
      } else {
        router.replace("/auth");
      }
    }

    handleAuth();
  }, [router]);

  return (
    <div className="flex min-h-svh items-center justify-center">
      <Loader2 className="text-primary size-8 animate-spin" />
    </div>
  );
}
