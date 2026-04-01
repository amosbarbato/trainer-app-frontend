"use client";

import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";

export function ChatOpenButton() {
  const [, setChatParams] = useQueryStates({
    chat_open: parseAsBoolean.withDefault(false),
    chat_initial_message: parseAsString,
  });

  return (
    <Button
      className="h-auto rounded-full p-4"
      onClick={() => setChatParams({ chat_open: true })}
    >
      <Sparkles className="size-6" />
    </Button>
  );
}
