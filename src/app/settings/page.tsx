import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeftIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Settings } from "./(components)/Settings";
import { MyBeaconLogo } from "@/components/svgs/my-beacon-logo";

export default function SettingsPage() {
  const t = useTranslations("SettingsPage");

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <MyBeaconLogo className="-mb-2 size-16 md:size-24" />
      <section className="glass m-4 h-max w-[--mobile-w] flex-col space-x-0 rounded-md border p-8 px-6 shadow-sm dark:bg-slate-900 md:m-0 md:w-max md:px-12">
        <Button
          variant="link"
          className="w-min p-0"
          asChild
          data-testid="return-button"
        >
          <Link href="/">
            <ChevronLeftIcon className="size-8" />
            {t("backButton")}
          </Link>
        </Button>
        <h1 className="text-lg font-bold md:text-2xl">{t("title")}</h1>
        <h2 className="text-xs font-medium text-gray-500 dark:text-gray-300 md:text-lg">
          {t("description")}
        </h2>

        <Separator className="my-6" />

        <Settings />
      </section>
      <div className="md:text-md flex text-sm font-extralight md:mt-2">
        Developed by:{" "}
        <a
          className="ml-1 font-bold text-primary"
          href="https://github.com/rickymm"
          target="__blank"
        >
          @rickymm
        </a>
      </div>
    </main>
  );
}
