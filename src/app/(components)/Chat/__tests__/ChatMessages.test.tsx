import { screen } from "@testing-library/react";
import type { Message } from "ai/react";
import { renderWithProviders } from "@/lib/testUtils";

import { ChatMessages } from "../ChatMessages";

const fakeUserMessage: Message = {
  id: "1",
  content: "Hello AI",
  role: "user",
};

const fakeAIMessage: Message = {
  id: "2",
  content: "Hello Human",
  role: "assistant",
};

function mockScroll(fn: jest.Mock) {
  window.HTMLElement.prototype.scrollIntoView = fn;
}

describe("ChatMessages", () => {
  function renderComponent(aiMessages: Message[]) {
    return renderWithProviders(<ChatMessages messages={aiMessages} />);
  }
  test("should render empty state if no messages", () => {
    const emptyMessages: Message[] = [];
    renderComponent(emptyMessages);

    expect(screen.getByTestId("empty-messages-section")).toBeVisible();
  });

  test("should render messages section", () => {
    mockScroll(jest.fn());

    const messages: Message[] = [fakeUserMessage];
    renderComponent(messages);

    expect(screen.getByTestId("messages-section")).toBeVisible();
    expect(screen.getByTestId("message-bubble")).toBeVisible();
  });

  test("should render two messages", () => {
    mockScroll(jest.fn());

    const messages: Message[] = [fakeUserMessage, fakeAIMessage];
    renderComponent(messages);

    const messagesBubble = screen.getAllByTestId("message-bubble");
    expect(messagesBubble).toHaveLength(messages.length);
    expect(messagesBubble[0]).toBeVisible();
    expect(messagesBubble[1]).toBeVisible();
  });

  test("should call scroll when messages are rendered", () => {
    const scrollFn = jest.fn();
    mockScroll(scrollFn);

    const messages: Message[] = [fakeUserMessage];
    renderComponent(messages);

    expect(scrollFn).toHaveBeenCalledTimes(1);
  });
});
