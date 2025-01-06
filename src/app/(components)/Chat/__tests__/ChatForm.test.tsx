import { screen } from "@testing-library/react";
import { noop, renderWithProviders } from "@/lib/testUtils";
import userEvent from "@testing-library/user-event";

import { ChatForm, type ChatFormProps } from "../ChatForm";

describe("ChatForm", () => {
  function renderComponent(props?: Partial<ChatFormProps>) {
    const {
      handleInputChange = noop,
      handleSubmit = noop,
      input = "",
      isLoading = false,
      stop = noop,
    } = props ?? {};

    return renderWithProviders(
      <ChatForm
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        input={input}
        isLoading={isLoading}
        stop={stop}
      />
    );
  }
  test("should render chat form components", () => {
    renderComponent();

    expect(screen.getByTestId("chat-form-container")).toBeVisible();
    expect(screen.getByRole("textbox")).toBeVisible();
    expect(screen.getByRole("button")).toBeVisible(); // Any button (stop or submit)
  });

  test("should call handleInputChange when typing on textarea", async () => {
    const mockHandleInputChange = jest.fn();
    renderComponent({ handleInputChange: mockHandleInputChange });
    const user = userEvent.setup();

    expect(mockHandleInputChange).not.toHaveBeenCalled();

    const textArea = screen.getByRole("textbox");
    const message = "something";
    await user.type(textArea, message);

    expect(mockHandleInputChange).toHaveBeenCalledTimes(message.length);
  });

  test("should render message in the textarea", () => {
    const message = "pre-rendered message";
    renderComponent({ input: message });

    expect(screen.getByRole("textbox")).toHaveValue(message);
  });

  test("should call handleSubmit when button is clicked", async () => {
    const mockHandleSubmit = jest.fn((e) => e.preventDefault());
    renderComponent({ handleSubmit: mockHandleSubmit });
    const user = userEvent.setup();

    expect(mockHandleSubmit).not.toHaveBeenCalled();

    const submitButton = screen.getByTestId("submit-button");
    await user.click(submitButton);
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  test("should call handleSubmit when 'Enter' key is pressed", async () => {
    const mockHandleSubmit = jest.fn();
    renderComponent({ handleSubmit: mockHandleSubmit });
    const user = userEvent.setup();

    expect(mockHandleSubmit).not.toHaveBeenCalled();

    const textarea = screen.getByRole("textbox");
    // types 'some message' then presses Enter key
    await user.type(textarea, "some message{enter}");
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  test("should render stop button", () => {
    renderComponent({ isLoading: true });

    expect(screen.getByTestId("stop-button")).toBeVisible();
  });

  test("should call stop function when stop button is clicked", async () => {
    const mockStopFn = jest.fn();
    renderComponent({ stop: mockStopFn, isLoading: true });
    const user = userEvent.setup();

    expect(mockStopFn).not.toHaveBeenCalled();

    const stopButton = screen.getByTestId("stop-button");
    await user.click(stopButton);
    expect(mockStopFn).toHaveBeenCalledTimes(1);
  });
});
