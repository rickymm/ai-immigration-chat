import { screen, within } from "@testing-library/react";
import type { Message } from "ai/react";
import { renderWithProviders } from "@/lib/testUtils";

import { ChatMessages, type ChatMessagesProps } from "../ChatMessages";
import userEvent from "@testing-library/user-event";

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
  function renderComponent({
    messages = [],
    append = jest.fn(),
  }: Partial<ChatMessagesProps>) {
    return renderWithProviders(
      <ChatMessages messages={messages} append={append} />
    );
  }
  test("should render empty state if no messages", () => {
    renderComponent({ messages: [] });

    expect(screen.getByTestId("empty-messages-section")).toBeVisible();
    expect(screen.getByTestId("suggestions-container")).toBeVisible();
  });

  test("should render messages section", () => {
    mockScroll(jest.fn());

    const messages: Message[] = [fakeUserMessage];
    renderComponent({ messages });

    expect(screen.getByTestId("messages-section")).toBeVisible();
    expect(screen.getByTestId("message-bubble")).toBeVisible();
  });

  test("should render two messages", () => {
    mockScroll(jest.fn());

    const messages: Message[] = [fakeUserMessage, fakeAIMessage];
    renderComponent({ messages });

    const messagesBubble = screen.getAllByTestId("message-bubble");
    expect(messagesBubble).toHaveLength(messages.length);
    expect(messagesBubble[0]).toBeVisible();
    expect(messagesBubble[1]).toBeVisible();
  });

  test("should call scroll when messages are rendered", () => {
    const scrollFn = jest.fn();
    mockScroll(scrollFn);

    const messages: Message[] = [fakeUserMessage];
    renderComponent({ messages });

    expect(scrollFn).toHaveBeenCalledTimes(1);
  });

  test("should render suggestions bubbles", () => {
    renderComponent({ messages: [] });

    const suggestionsContainer = within(
      screen.getByTestId("suggestions-container")
    );

    expect(
      suggestionsContainer.getAllByTestId("suggestion-bubble")
    ).toHaveLength(4);
  });

  test("should call append when suggestion bubble is clicked", async () => {
    const mockedAppend = jest.fn();
    renderComponent({ messages: [], append: mockedAppend });
    const user = userEvent.setup();

    expect(mockedAppend).not.toHaveBeenCalled();

    const suggestionsContainer = within(
      screen.getByTestId("suggestions-container")
    );
    const firstSuggestion =
      suggestionsContainer.getAllByTestId("suggestion-bubble")[0];
    await user.click(firstSuggestion);

    expect(mockedAppend).toHaveBeenCalledTimes(1);
  });
});
