"use client";

import { useEffect, useRef, useState } from "react";
import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";
import { Streamdown } from "streamdown";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowUp, Circle, Sparkles } from "lucide-react";

const SUGGESTED_MESSAGES = ["Monte meu plano de treino"];

export function Chat() {
  const [chatParams, setChatParams] = useQueryStates({
    chat_open: parseAsBoolean.withDefault(false),
    chat_initial_message: parseAsString,
  });

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: `${process.env.NEXT_PUBLIC_API_URL}/ai`,
      credentials: "include",
    }),
  });

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialMessageSentRef = useRef(false);

  useEffect(() => {
    if (
      chatParams.chat_open &&
      chatParams.chat_initial_message &&
      !initialMessageSentRef.current
    ) {
      initialMessageSentRef.current = true;
      sendMessage({ text: chatParams.chat_initial_message });
      setChatParams({ chat_initial_message: null });
    }
  }, [
    chatParams.chat_open,
    chatParams.chat_initial_message,
    sendMessage,
    setChatParams,
  ]);

  useEffect(() => {
    if (!chatParams.chat_open) initialMessageSentRef.current = false;
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!chatParams.chat_open) return null;

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    sendMessage({ text: trimmed });
    setInput("");
  };

  const handleSuggestion = (text: string) => {
    sendMessage({ text });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isStreaming = status === "streaming";
  const isLoading = status === "submitted" || isStreaming;

  return (
    <Sheet
      open={chatParams.chat_open}
      onOpenChange={(open) => {
        if (!open) setChatParams({ chat_open: false });
      }}
    >
      <SheetContent
        side="bottom"
        className="m-4 max-h-5/6 min-h-5/6 gap-0 rounded-3xl"
      >
        <SheetHeader className="flex flex-row gap-2">
          <Button
            size="icon"
            className="bg-primary/8 ring-primary/15 text-primary size-10.5"
          >
            <Sparkles className="size-4" />
          </Button>
          <div className="gpa-2 flex flex-col">
            <SheetTitle>Trainer AI</SheetTitle>
            <SheetDescription className="flex items-center gap-1">
              <Circle className="text-online fill-online size-2" />
              <span className="text-primary text-xs">Online</span>
            </SheetDescription>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-5">
          {messages.map((message) => (
            <div
              key={message.id}
              className={
                message.role === "assistant"
                  ? "flex flex-col items-start pt-2 pr-15 pl-5"
                  : "flex flex-col items-end pt-2 pr-5 pl-15"
              }
            >
              <div
                className={
                  message.role === "assistant"
                    ? "bg-secondary rounded-xl p-3"
                    : "bg-primary rounded-xl p-3"
                }
              >
                {message.role === "assistant" ? (
                  message.parts.map((part, i) =>
                    part.type === "text" ? (
                      <Streamdown
                        key={`${message.id}-${i}`}
                        isAnimating={
                          isStreaming && i === message.parts.length - 1
                        }
                        className="font-heading text-sm leading-relaxed"
                      >
                        {part.text}
                      </Streamdown>
                    ) : null,
                  )
                ) : (
                  <p className="font-heading text-primary-foreground text-sm leading-relaxed">
                    {message.parts
                      .filter((part) => part.type === "text")
                      .map(
                        (part) => (part as { type: "text"; text: string }).text,
                      )
                      .join("")}
                  </p>
                )}
              </div>
            </div>
          ))}

          {isStreaming && (
            <div className="flex items-start gap-2 pt-2 pr-15 pl-5">
              <div className="bg-secondary flex gap-1 rounded-xl p-3">
                <span className="bg-foreground/50 h-2 w-2 animate-bounce rounded-full" />
                <span className="bg-foreground/50 h-2 w-2 animate-bounce rounded-full [animation-delay:0.2s]" />
                <span className="bg-foreground/50 h-2 w-2 animate-bounce rounded-full [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="flex shrink-0 flex-col gap-3 pb-5">
          {messages.length === 0 && (
            <div className="flex gap-2.5 overflow-x-auto px-5">
              {SUGGESTED_MESSAGES.map((suggestion) => (
                <button
                  key={suggestion}
                  className="bg-primary/10 font-heading text-foreground rounded-full px-4 py-2 text-sm whitespace-nowrap"
                  onClick={() => handleSuggestion(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        <SheetFooter className="flex-row items-center gap-2">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua mensagem"
            disabled={isLoading}
          />
          <Button
            size="icon"
            className="size-10.5"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
          >
            <ArrowUp className="size-5" />
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
