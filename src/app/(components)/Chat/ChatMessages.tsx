"use client";

import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatDateTime } from "@/lib/utils";
import type { CreateMessage, Message } from "ai/react";
import { MyBeaconLogo } from "@/components/svgs/my-beacon-logo";
import { MarkdownReader } from "./MarkdownReader";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { type ChatRequestOptions } from "ai";
import { Button } from "@/components/ui/button";

export interface ChatMessagesProps {
  messages: Message[];
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
}

export function ChatMessages({ messages, append }: ChatMessagesProps) {
  const t = useTranslations("ChatPage");
  const isMessagesEmpty = messages.length === 0;
  const chatContainerId = "chat-container";

  useEffect(() => {
    if (isMessagesEmpty) return;
    document.getElementById(chatContainerId)?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "start",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  if (isMessagesEmpty) {
    const suggestions = [
      t("emptyState.suggestion.1"),
      t("emptyState.suggestion.2"),
      t("emptyState.suggestion.3"),
      t("emptyState.suggestion.4"),
    ];
    return (
      <section
        className="flex h-[--screen-h] w-full flex-col items-center justify-center"
        data-testid="empty-messages-section"
      >
        <MyBeaconLogo className="size-36 md:size-48" />
        <span className="-mt-6 text-lg font-bold md:text-2xl">
          {t("emptyState.title")}
        </span>
        <p className="text-center text-sm md:text-lg">
          {t("emptyState.description")}
        </p>

        <div
          className="flex items-center justify-center gap-2"
          data-testid="suggestions-container"
        >
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion}
              type="button"
              variant="outline"
              size="lg"
              className="text-md rounded-xl rounded-br-none bg-primary/20 px-4 py-2 transition-all hover:shadow-md dark:bg-primary"
              onClick={() => append({ content: suggestion, role: "user" })}
              data-testid="suggestion-bubble"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </section>
    );
  }

  return (
    <ScrollArea
      className="h-full w-full py-24 pr-4 md:py-28"
      id={chatContainerId}
      data-testid="messages-section"
    >
      {messages.map((message) => {
        const isUser = message.role === "user";
        const createdAt = formatDateTime(message.createdAt);

        return (
          <article
            key={message.id}
            className={cn("mb-4 flex h-full items-end gap-2", {
              "justify-end": isUser,
            })}
            data-testid="message-bubble"
          >
            {!isUser && (
              <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border bg-white p-1 dark:bg-slate-800">
                <MyBeaconLogo className="aspect-square h-full w-full" />
              </div>
            )}

            <div
              className={cn("flex flex-col", {
                "items-end": isUser,
              })}
            >
              <Label className="sr-only">
                {t(isUser ? "sr-you-said" : "sr-ai-said")}
              </Label>

              <MarkdownReader
                content={message.content}
                className={cn(
                  "max-w-max whitespace-pre-wrap rounded-xl border px-4 py-2",
                  isUser
                    ? "rounded-br-none bg-primary/20 dark:bg-primary"
                    : "rounded-bl-none bg-white dark:bg-slate-800"
                )}
              />

              <span
                className={cn(
                  "pt-1 text-xs font-light text-secondary-foreground",
                  isUser ? "text-right" : "text-left"
                )}
              >
                {createdAt}
              </span>
            </div>
          </article>
        );
      })}
    </ScrollArea>
  );
}
