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

export function ProfileMenu() {
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
      <DropdownMenuTrigger className="rounded-full">
        <span className="sr-only">{t("sr-title")}</span>
        <SettingsIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-52 mr-4 md:mr-0">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ToggleLeftIcon />
            {t("theme")}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                disabled={theme === "light"}
              >
                <SunIcon />
                {t("light")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                disabled={theme === "dark"}
              >
                <MoonIcon />
                {t("dark")}
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setTheme("system")}
                disabled={theme === "system"}
              >
                <LaptopIcon />
                {t("system")}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <LanguagesIcon />
            {t("language")}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => handleSelectLanguage("en")}>
                🇬🇧 {t("english")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSelectLanguage("pt-br")}>
                🇧🇷 {t("portuguese")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSelectLanguage("fr")}>
                🇫🇷 {t("french")}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <ArrowUpRightFromSquareIcon />
            {t("settings")}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
