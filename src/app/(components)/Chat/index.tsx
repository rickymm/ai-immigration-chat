"use client";

import { useChat } from "ai/react";
import { ChatForm } from "./ChatForm";
import { ChatMessages } from "./ChatMessages";
import { useEffect } from "react";
import { useMessagesContext } from "@/contexts/MessagesContext";

export function Chat() {
  const {
    input,
    handleInputChange,
    handleSubmit,
    messages,
    isLoading,
    stop,
    append,
    setMessages,
  } = useChat({
    api: "/api/chat",
  });
  const { messages: storedMessages, setMessages: setStoredMessages } =
    useMessagesContext();

  useEffect(() => {
    if (messages.length == 0 && storedMessages.length > 0) {
      setMessages(storedMessages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (storedMessages.length !== messages.length && !isLoading) {
      setStoredMessages(messages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, isLoading]);

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
