"use client";

import { useChat } from "ai/react";
import { ChatForm } from "./ChatForm";
import { ChatMessages } from "./ChatMessages";

export function Chat() {
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
  });

  return (
    <>
      <ChatMessages messages={messages} />
      <ChatForm
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
