"use client";

import React, { createContext, useContext, useState } from "react";
import type { Message } from "ai/react";

export type ContextMessage = Message[];
export const MessagesContext = createContext<{
  messages: ContextMessage;
  setMessages: React.Dispatch<ContextMessage>;
}>({
  messages: [],
  setMessages: () => null,
});

export function useMessagesContext() {
  const context = useContext(MessagesContext);

  if (context === undefined) {
    throw new Error("useMessagesContext must be used within MessagesContext");
  }

  return context;
}

export function MessagesProvider({
  children,
  initialMessages = [],
}: {
  children: React.ReactNode;
  initialMessages?: ContextMessage;
}) {
  const [messages, setMessages] = useState<ContextMessage>(initialMessages);

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
}
