import { screen, within } from "@testing-library/react";
import { Settings } from "../Settings";
import { renderWithProviders } from "@/lib/testUtils";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: jest.fn() }),
}));

describe("SettingsForm", () => {
  function renderComponent() {
    return renderWithProviders(<Settings />);
  }
  test("should render settings", () => {
    renderComponent();
    expect(screen.getByTestId("accent-container")).toBeVisible();
    expect(screen.getByTestId("theme-container")).toBeVisible();
    expect(screen.getByTestId("language-container")).toBeVisible();
  });

  test("should render accent color components", () => {
    renderComponent();
    const accentContainer = within(screen.getByTestId("accent-container"));
    expect(accentContainer.getByTestId("accent-label")).toBeVisible();
    expect(accentContainer.getAllByTestId("color-button")).toHaveLength(4);
    expect(accentContainer.getAllByTestId("element-example")).toHaveLength(4);
  });

  test("should render theme components", () => {
    renderComponent();
    const themeContainer = within(screen.getByTestId("theme-container"));
    expect(themeContainer.getByTestId("theme-label")).toBeVisible();
    expect(themeContainer.getByTestId("theme-light")).toBeVisible();
    expect(themeContainer.getByTestId("theme-dark")).toBeVisible();
    expect(themeContainer.getByTestId("theme-system")).toBeVisible();
  });

  test("should render language components", () => {
    renderComponent();
    const languageContainer = within(screen.getByTestId("language-container"));
    expect(languageContainer.getByTestId("language-label")).toBeVisible();
    expect(languageContainer.getByTestId("language-en")).toBeVisible();
    expect(languageContainer.getByTestId("language-ptBr")).toBeVisible();
    expect(languageContainer.getByTestId("language-fr")).toBeVisible();
  });
});
