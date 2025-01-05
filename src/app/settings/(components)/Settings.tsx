"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { COLORS } from "@/lib/constants";
import { changeCssAccentColor } from "@/lib/utils";
import {
  LaptopIcon,
  MoonIcon,
  SunIcon,
  SendHorizontalIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export function Settings() {
  const t = useTranslations("SettingsPage");
  const { setTheme } = useTheme();

  const { refresh } = useRouter();

  function handleSelectLanguage(lang: string) {
    document.cookie = `language=${JSON.stringify(lang)}`;
    refresh();
  }

  function handleAccentColor(colorKey: string) {
    const color = COLORS[colorKey as keyof typeof COLORS];
    document.cookie = `accentColor=${JSON.stringify(colorKey)}`;
    changeCssAccentColor(color.cssVar);
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="form-group">
        <Label>{t("accentLabel")}</Label>
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
              />
            );
          })}
        </div>
        <div className="flex gap-2">
          <Button>{t("exampleButton")}</Button>
          <Button>
            <SendHorizontalIcon />
          </Button>
          <div className="flex px-3 py-1.5 rounded-xl border rounded-br-none bg-primary/20 dark:bg-primary ">
            {t("exampleButton")}
          </div>
          <Button variant="link">{t("exampleButton")}</Button>
        </div>
      </div>

      <div className="form-group">
        <Label>{t("themeLabel")}</Label>
        <ToggleGroup
          type="single"
          onValueChange={setTheme}
          variant="outline"
          className="justify-start"
        >
          <ToggleGroupItem value="light">
            <SunIcon className="size-4" />
            {t("light")}
          </ToggleGroupItem>
          <ToggleGroupItem value="dark">
            <MoonIcon className="h-4 w-4" />
            {t("dark")}
          </ToggleGroupItem>
          <ToggleGroupItem value="system">
            <LaptopIcon className="size-4" />
            {t("system")}
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="form-group">
        <Label>{t("languageLabel")}</Label>
        <ToggleGroup
          type="single"
          onValueChange={handleSelectLanguage}
          variant="outline"
          className="justify-start"
        >
          <ToggleGroupItem value="en">🇬🇧 {t("english")}</ToggleGroupItem>
          <ToggleGroupItem value="pt-br">🇧🇷 {t("portuguese")}</ToggleGroupItem>
          <ToggleGroupItem value="fr">🇫🇷 {t("french")}</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
