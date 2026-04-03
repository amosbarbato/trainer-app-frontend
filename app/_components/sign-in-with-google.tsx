"use client";

import Image from "next/image";
import { authClient } from "@/_lib/auth-client";
import { Button } from "./ui/button";

export default function SignInWithGoogle() {
  const handleGoogleLogin = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    });

    if (error) console.error(error.message);
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      variant="secondary"
      className="h-9.5 w-57.5 cursor-pointer gap-2 rounded-full text-xs font-semibold text-black"
    >
      <Image
        src="/google-icon.svg"
        alt=""
        width={16}
        height={16}
        className="shrink-0"
      />
      Fazer login com Google
    </Button>
  );
}
