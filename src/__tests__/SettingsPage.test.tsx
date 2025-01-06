import { renderWithProviders } from "@/lib/testUtils";
import { screen } from "@testing-library/react";

import SettingsPage from "../app/settings/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: jest.fn() }),
}));

describe("Settings Page", () => {
  function renderPage() {
    return renderWithProviders(<SettingsPage />);
  }

  test("should render settings page components", () => {
    renderPage();

    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toBeVisible();

    const description = screen.getByRole("heading", { level: 2 });
    expect(description).toBeVisible();

    const returnButton = screen.getByTestId("return-button");
    expect(returnButton).toBeVisible();
    expect(returnButton).toHaveAttribute("href", "/");
  });
});
