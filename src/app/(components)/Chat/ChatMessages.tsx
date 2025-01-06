"use client";

import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatDateTime } from "@/lib/utils";
import { type Message } from "ai/react";
import { InboxIcon } from "lucide-react";
import { MyBeaconLogo } from "@/components/svgs/my-beacon-logo";
import { MarkdownReader } from "./MarkdownReader";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export function ChatMessages({ messages }: { messages: Message[] }) {
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
    return (
      <section
        className="flex flex-col justify-center items-center w-full h-[--screen-h]"
        data-testid="empty-messages-section"
      >
        <InboxIcon className="size-24 md:size-32" />
        <span className="font-bold text-lg md:text-2xl">
          {t("emptyState.title")}
        </span>
        <p className="text-sm md:text-lg">{t("emptyState.description")}</p>
      </section>
    );
  }

  return (
    <ScrollArea
      className="w-full h-full pr-4 py-24 md:py-28"
      id={chatContainerId}
      data-testid="messages-section"
    >
      {messages.map((message) => {
        const isUser = message.role === "user";
        const createdAt = formatDateTime(message.createdAt);

        return (
          <article
            key={message.id}
            className={cn("flex items-end gap-2 mb-4 h-full", {
              "justify-end": isUser,
            })}
            data-testid="message-bubble"
          >
            {!isUser && (
              <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white dark:bg-slate-800 p-1 border">
                <MyBeaconLogo className="aspect-square w-full h-full" />
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
                  "px-4 py-2 whitespace-pre-wrap rounded-xl border max-w-max",
                  isUser
                    ? "rounded-br-none bg-primary/20 dark:bg-primary"
                    : "rounded-bl-none bg-white dark:bg-slate-800"
                )}
              />

              <span
                className={cn(
                  "font-light text-xs text-secondary-foreground pt-1",
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
