"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/_lib/auth-client";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      console.error(error.message);
      return;
    }

    router.push("/auth");
  };

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      className="text-destructive hover:text-destructive font-heading text-base font-semibold"
    >
      Sair da conta
      <LogOut className="size-4" />
    </Button>
  );
}
