import { renderWithProviders } from "@/lib/testUtils";
import { screen, within } from "@testing-library/react";

import ChatPage from "../app/page";

jest.mock("ai/react", () => ({
  useChat: () => ({
    input: "",
    handleInputChange: jest.fn(),
    handleSubmit: jest.fn(),
    messages: [],
    isLoading: false,
    stop: jest.fn(),
  }),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: jest.fn() }),
}));

describe("Chat Page", () => {
  function renderPage() {
    return renderWithProviders(<ChatPage />);
  }

  test("should render header and chat sections", () => {
    renderPage();
    expect(screen.getByTestId("header-section")).toBeVisible();
    expect(screen.getByTestId("chat-section")).toBeVisible();
  });

  test("should render title, description and settings menu within the header", () => {
    renderPage();
    const header = within(screen.getByTestId("header-section"));

    const title = header.getByRole("heading", { level: 1 });
    expect(title).toBeVisible();

    const description = header.getByRole("heading", { level: 2 });
    expect(description).toBeVisible();

    expect(header.getByTestId("settings-menu-button")).toBeVisible();
  });
});
