"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontalIcon, XIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export interface ChatFormProps {
  input: string;
  handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
  handleSubmit(event?: { preventDefault?: () => void }): void;
  isLoading: boolean;
  stop(): void;
}

export function ChatForm({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  stop,
}: ChatFormProps) {
  const t = useTranslations("ChatPage");
  function sendOnEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-4 left-auto w-[--mobile-w] md:max-w-[--screen-w] flex items-center overflow-hidden rounded-md border focus-within:ring-1 focus:ring-primary focus-within:ring-primary p-2 pr-4 glass"
      data-testid="chat-form-container"
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
      {isLoading ? (
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="gap-1.5"
          onClick={stop}
          data-testid="stop-button"
        >
          <span className="sr-only">{t("sr-stop-button")}</span>
          <XIcon className="size-3.5" />
        </Button>
      ) : (
        <Button
          type="submit"
          size="icon"
          className="gap-1.5"
          data-testid="submit-button"
        >
          <span className="sr-only">{t("sr-send-button")}</span>
          <SendHorizontalIcon className="size-3.5" />
        </Button>
      )}
    </form>
  );
}
