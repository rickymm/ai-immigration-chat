"use client";

import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatDateTime } from "@/lib/utils";
import { type Message } from "ai/react";
import { InboxIcon } from "lucide-react";
import { MyBeaconLogo } from "../my-beacon-logo";
import { MarkdownReader } from "./MarkdownReader";
import { UserAvatar } from "@/components/functional/user-avatar";

export function ChatMessages({ messages }: { messages: Message[] }) {
  if (messages.length === 0) {
    return (
      <section className="container flex flex-col justify-center items-center w-full h-full">
        <InboxIcon className="size-32 font-thin" />
        <span className="font-bold text-xl">No messages yet</span>
        <p className="text-md">Start by sending your first question.</p>
      </section>
    );
  }

  return (
    <ScrollArea className="w-full h-full pr-4 pb-4">
      {messages.map((message) => {
        const isUser = message.role === "user";
        const createdAt = formatDateTime(message.createdAt);

        return (
          <article
            key={message.id}
            className={cn("flex items-end gap-2 mb-4 h-full", {
              "justify-end": isUser,
            })}
          >
            {isUser ? (
              <UserAvatar />
            ) : (
              <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white p-1 border">
                <MyBeaconLogo className="aspect-square w-full h-full" />
              </div>
            )}

            <div className="flex flex-col ">
              <Label className="sr-only">
                {isUser ? "You said:" : "AI said:"}
              </Label>

              <MarkdownReader
                content={message.content}
                className={cn(
                  "bg-white px-4 py-2 whitespace-pre-wrap rounded-xl border",
                  isUser ? "rounded-br-none" : "rounded-bl-none"
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
