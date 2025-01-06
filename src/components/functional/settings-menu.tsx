"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LanguagesIcon,
  LaptopIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
  ToggleLeftIcon,
  ArrowUpRightFromSquareIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function SettingsMenu() {
  const t = useTranslations("ProfileMenu");
  const { theme, setTheme } = useTheme();

  // TODO: refactor to shared function
  const { refresh } = useRouter();
  function handleSelectLanguage(lang: "en" | "pt-br" | "fr") {
    document.cookie = `language=${JSON.stringify(lang)}`;
    refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="rounded-full"
        data-testid="settings-menu-button"
      >
        <span className="sr-only">{t("sr-title")}</span>
        <SettingsIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-52 mr-4 md:mr-0"
        data-testid="menu-items-container"
      >
        <DropdownMenuSub>
          <DropdownMenuSubTrigger data-testid="theme-menu">
            <ToggleLeftIcon />
            {t("theme")}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent data-testid="theme-menu-container">
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                disabled={theme === "light"}
                data-testid="light"
              >
                <SunIcon />
                {t("light")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                disabled={theme === "dark"}
                data-testid="dark"
              >
                <MoonIcon />
                {t("dark")}
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setTheme("system")}
                disabled={theme === "system"}
                data-testid="system"
              >
                <LaptopIcon />
                {t("system")}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger data-testid="language-menu">
            <LanguagesIcon />
            {t("language")}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent data-testid="language-menu-container">
              <DropdownMenuItem
                onClick={() => handleSelectLanguage("en")}
                data-testid="english"
              >
                🇬🇧 {t("english")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSelectLanguage("pt-br")}
                data-testid="portuguese"
              >
                🇧🇷 {t("portuguese")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSelectLanguage("fr")}
                data-testid="french"
              >
                🇫🇷 {t("french")}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild data-testid="more-settings-link">
          <Link href="/settings">
            <ArrowUpRightFromSquareIcon />
            {t("settings")}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
