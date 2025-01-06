"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { COLORS } from "@/lib/constants";
import { useChangeLanguage } from "@/lib/hooks/useChangeLanguage";
import { changeCssAccentColor } from "@/lib/utils";
import {
  LaptopIcon,
  MoonIcon,
  SunIcon,
  SendHorizontalIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

export function Settings() {
  const t = useTranslations("SettingsPage");
  const { setTheme } = useTheme();

  const handleSelectLanguage = useChangeLanguage();

  function handleAccentColor(colorKey: string) {
    const color = COLORS[colorKey as keyof typeof COLORS];
    document.cookie = `accentColor=${JSON.stringify(colorKey)}`;
    changeCssAccentColor(color.cssVar);
  }

  return (
    <div className="flex flex-col space-y-6" data-testid="settings-container">
      <div className="form-group" data-testid="accent-container">
        <Label data-testid="accent-label">{t("accentLabel")}</Label>
        <div className="flex space-x-4">
          {/* TODO: Find out about bug that everything is working but when changing
          global.css, these buttons lose colors */}
          {Object.keys(COLORS).map((colorKey) => {
            const color = COLORS[colorKey as keyof typeof COLORS].tw;
            return (
              <Button
                key={colorKey}
                onClick={() => handleAccentColor(colorKey)}
                aria-label={`${t("aria-accent")}: ${colorKey}`}
                className={`size-8 ${color} hover:${color}`}
                data-testid="color-button"
              />
            );
          })}
        </div>
        <div className="flex gap-2">
          <Button data-testid="element-example">{t("exampleButton")}</Button>
          <Button data-testid="element-example">
            <SendHorizontalIcon />
          </Button>
          <div
            className="flex px-3 py-1.5 rounded-xl border rounded-br-none bg-primary/20 dark:bg-primary"
            data-testid="element-example"
          >
            {t("exampleButton")}
          </div>
          <Button variant="link" data-testid="element-example">
            {t("exampleButton")}
          </Button>
        </div>
      </div>

      <div className="form-group" data-testid="theme-container">
        <Label data-testid="theme-label">{t("themeLabel")}</Label>
        <ToggleGroup
          type="single"
          onValueChange={setTheme}
          variant="outline"
          className="justify-start"
        >
          <ToggleGroupItem value="light" data-testid="theme-light">
            <SunIcon className="size-4" />
            {t("light")}
          </ToggleGroupItem>
          <ToggleGroupItem value="dark" data-testid="theme-dark">
            <MoonIcon className="h-4 w-4" />
            {t("dark")}
          </ToggleGroupItem>
          <ToggleGroupItem value="system" data-testid="theme-system">
            <LaptopIcon className="size-4" />
            {t("system")}
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="form-group" data-testid="language-container">
        <Label data-testid="language-label">{t("languageLabel")}</Label>
        <ToggleGroup
          type="single"
          onValueChange={handleSelectLanguage}
          variant="outline"
          className="justify-start"
        >
          <ToggleGroupItem value="en" data-testid="language-en">
            🇬🇧 {t("english")}
          </ToggleGroupItem>
          <ToggleGroupItem value="pt-br" data-testid="language-ptBr">
            🇧🇷 {t("portuguese")}
          </ToggleGroupItem>
          <ToggleGroupItem value="fr" data-testid="language-fr">
            🇫🇷 {t("french")}
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
