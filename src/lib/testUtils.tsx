import { render } from "@testing-library/react";
import messages from "@/../messages/en.json";
import { NextIntlClientProvider } from "next-intl";

export const noop = () => {
  /* void function */
};

export function renderWithProviders(component: React.JSX.Element) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {component}
    </NextIntlClientProvider>
  );
}
