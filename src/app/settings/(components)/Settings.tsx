"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { COLORS } from "@/lib/constants";
import { changeCssAccentColor } from "@/lib/utils";
import { LaptopIcon, MoonIcon, SunIcon, CircleIcon } from "lucide-react";
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
        <ToggleGroup
          type="single"
          onValueChange={handleAccentColor}
          variant="outline"
          size="lg"
          className="justify-start"
        >
          {Object.keys(COLORS).map((colorKey) => {
            const color = COLORS[colorKey as keyof typeof COLORS].tw;

            return (
              <ToggleGroupItem
                key={colorKey}
                value={colorKey}
                aria-label={`${t("aria-accent")}: ${colorKey}`}
              >
                <CircleIcon
                  className={`size-14 text-${color} fill-${color} stroke-${color}`}
                />
              </ToggleGroupItem>
            );
          })}
        </ToggleGroup>
        <Button>{t("exampleButton")}</Button>
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

      <Separator className="my-6" />

      <div className="form-group">
        <Label className="text-destructive">{t("dangerLabel")}</Label>
        <Button variant="destructive">{t("deactivateButton")}</Button>
      </div>
    </div>
  );
}
