"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { changeCssAccentColor } from "@/lib/utils";

export function ThemeProvider({
  children,
  accentColor,
  ...props
}: React.ComponentProps<typeof NextThemesProvider> & { accentColor: string }) {
  React.useEffect(() => {
    changeCssAccentColor(accentColor);
  }, [accentColor]);
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
