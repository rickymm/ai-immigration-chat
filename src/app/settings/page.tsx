import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeftIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Settings } from "./(components)/Settings";

export default function SettingsPage() {
  const t = useTranslations("SettingsPage");

  return (
    <main className="w-full min-h-screen flex items-center justify-center">
      <section className="header dark:bg-slate-900 flex-col w-[--mobile-w] m-4 md:m-0 md:w-max h-max space-x-0 md:px-12 px-6">
        <Button variant="link" className="w-min p-0" asChild>
          <Link href="/">
            <ChevronLeftIcon className="size-8" />
            {t("backButton")}
          </Link>
        </Button>
        <h1 className="text-lg md:text-2xl font-bold">{t("title")}</h1>
        <h2 className="text-xs md:text-lg font-medium text-gray-500 dark:text-gray-300">
          {t("description")}
        </h2>
        <Separator className="my-6" />

        <Settings />
      </section>
    </main>
  );
}
