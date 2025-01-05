"use client";

import { useChat } from "ai/react";
import { ChatForm } from "./ChatForm";
import { ChatMessages } from "./ChatMessages";

export function Chat() {
  const { input, handleInputChange, handleSubmit, messages, isLoading, stop } =
    useChat({
      api: "/api/chat",
    });

  return (
    <section className="relative">
      <ChatMessages messages={messages} />
      <ChatForm
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        stop={stop}
      />
    </section>
  );
}
