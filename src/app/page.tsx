import { SettingsMenu } from "@/components/functional/settings-menu";
import { Chat } from "./(components)/Chat";
import { useTranslations } from "next-intl";
import { MyBeaconLogo } from "@/components/svgs/my-beacon-logo";

export default function Home() {
  const t = useTranslations("ChatPage");

  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <div className="m-4 h-[--screen-h] w-full md:m-0 md:w-[--screen-w]">
        <section
          className="glass fixed left-0 top-0 z-10 flex w-full items-center justify-between space-x-4 border-b p-4 shadow-sm md:left-auto md:top-4 md:w-[--screen-w] md:rounded-md md:p-6"
          data-testid="header-section"
        >
          <div className="flex items-center justify-center space-x-4">
            <MyBeaconLogo className="-mb-1 size-12" />
            <div className="flex-col">
              <h1 className="text-lg font-bold md:text-2xl">{t("title")}</h1>
              <h2 className="text-xs font-medium text-gray-500 dark:text-gray-300 md:text-lg">
                {t("description")}
              </h2>
            </div>
          </div>

          <SettingsMenu />
        </section>

        <Chat />
      </div>
    </main>
  );
}
