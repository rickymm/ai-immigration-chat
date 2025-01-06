import { screen, within } from "@testing-library/react";
import { renderWithProviders } from "@/lib/testUtils";
import userEvent from "@testing-library/user-event";

import { SettingsMenu } from "../settings-menu";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: jest.fn() }),
}));

describe("SettingsMenu", () => {
  function renderComponent() {
    return renderWithProviders(<SettingsMenu />);
  }

  async function openSettingsMenu() {
    const user = userEvent.setup();
    const settingsButton = screen.getByTestId("settings-menu-button");
    await user.click(settingsButton);
  }
  async function waitForMenuToBeOpen() {
    const itemsContainer = await screen.findByTestId("menu-items-container");
    expect(itemsContainer).toBeVisible();
    return itemsContainer;
  }

  test("should have menu button", () => {
    renderComponent();
    expect(screen.getByTestId("settings-menu-button")).toBeVisible();
  });

  test("should render theme, language and more settings items within menu", async () => {
    renderComponent();
    await openSettingsMenu();
    const itemsContainer = await waitForMenuToBeOpen();

    const items = ["theme-menu", "language-menu", "more-settings-link"];
    items.forEach((item) =>
      expect(within(itemsContainer).getByTestId(item)).toBeVisible()
    );
  });

  test("should render 3 theme options", async () => {
    renderComponent();
    const user = userEvent.setup();
    await openSettingsMenu();
    await waitForMenuToBeOpen();

    const themeMenuButton = screen.getByTestId("theme-menu");
    await user.click(themeMenuButton);

    const themesContainer = await screen.findByTestId("theme-menu-container");
    expect(themesContainer).toBeVisible();

    const themeOptions = ["light", "dark", "system"];
    themeOptions.forEach((theme) =>
      expect(within(themesContainer).getByTestId(theme)).toBeVisible()
    );
  });

  test("should render 3 language options", async () => {
    renderComponent();
    const user = userEvent.setup();
    await openSettingsMenu();
    await waitForMenuToBeOpen();

    const languageMenuButton = screen.getByTestId("language-menu");
    await user.click(languageMenuButton);

    const languagesContainer = await screen.findByTestId(
      "language-menu-container"
    );
    expect(languagesContainer).toBeVisible();

    const languageOptions = ["english", "portuguese", "french"];
    languageOptions.forEach((language) =>
      expect(within(languagesContainer).getByTestId(language)).toBeVisible()
    );
  });

  test("should 'More Settings' have a link to /settings", async () => {
    renderComponent();
    await openSettingsMenu();
    await waitForMenuToBeOpen();

    expect(screen.getByTestId("more-settings-link")).toHaveAttribute(
      "href",
      "/settings"
    );
  });
});
