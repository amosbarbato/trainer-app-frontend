"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/_lib/auth-client";

export function AuthGuard() {
  const router = useRouter();

  useEffect(() => {
    async function check() {
      const session = await authClient.getSession();

      if (!session.data?.user) {
        router.replace("/auth");
      }
    }

    check();
  }, [router]);

  return null;
}
