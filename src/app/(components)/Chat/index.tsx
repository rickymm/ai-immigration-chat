"use client";

import { useChat } from "ai/react";
import { ChatForm } from "./ChatForm";
import { ChatMessages } from "./ChatMessages";

export function Chat() {
  const {
    input,
    handleInputChange,
    handleSubmit,
    messages,
    isLoading,
    stop,
    append,
  } = useChat({
    api: "/api/chat",
  });

  return (
    <section data-testid="chat-section">
      <ChatMessages messages={messages} append={append} />
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
