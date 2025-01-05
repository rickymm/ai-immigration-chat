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
  LogOutIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
  ToggleLeftIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export function ProfileMenu() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <span className="sr-only">Profile menu</span>
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
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ToggleLeftIcon />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                disabled={theme === "light"}
              >
                <SunIcon />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                disabled={theme === "dark"}
              >
                <MoonIcon />
                Dark
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full">
          <Button variant="destructive" className="w-full">
            Logout <LogOutIcon />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
