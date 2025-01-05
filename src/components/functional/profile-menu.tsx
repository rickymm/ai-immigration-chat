"use client";

import { UserAvatar } from "@/components/functional/user-avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
  LogOutIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
  ToggleLeftIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ProfileMenu() {
  const t = useTranslations("ProfileMenu");
  const { theme, setTheme } = useTheme();

  const { refresh } = useRouter();

  function handleSelectLanguage(lang: "en" | "pt-br") {
    document.cookie = `language=${JSON.stringify(lang)}`;
    refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <span className="sr-only">{t("sr-title")}</span>
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-52 mr-4 md:mr-0">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            {/* TODO: Replace with user name and email */}
            <span className="text-lg font-semibold">Ricky Moino</span>
            <span className="text-sm text-gray-600">rickymafra@gmail.com</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <SettingsIcon />
            {t("settings")}
          </Link>
        </DropdownMenuItem>

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
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full">
          <Button variant="destructive" className="w-full">
            {t("logout")} <LogOutIcon />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
