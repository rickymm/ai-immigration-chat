"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonalIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export function ChatForm({
  input,
  handleInputChange,
  handleSubmit,
}: {
  input: string;
  handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
  handleSubmit(): void;
}) {
  const t = useTranslations("ChatPage");
  function sendOnEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex items-center overflow-hidden rounded-md border bg-white dark:bg-white/10 backdrop-blur-md focus-within:ring-1 focus-within:ring-ring p-2 pr-4"
    >
      <Label htmlFor="chat-input" className="sr-only">
        {t("sr-chat-input")}
      </Label>
      <Textarea
        id="chat-input"
        placeholder={t("input-placeholder")}
        value={input}
        onChange={handleInputChange}
        rows={1}
        onKeyDown={sendOnEnter}
        className="resize-none border-0 px-3 shadow-none focus-visible:ring-0 dark:bg-transparent"
      />
      <Button type="submit" size="icon" className="gap-1.5">
        <span className="sr-only">{t("sr-send-button")}</span>
        <SendHorizonalIcon className="size-3.5" />
      </Button>
    </form>
  );
}
