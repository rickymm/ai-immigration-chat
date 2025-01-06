import { SettingsMenu } from "@/components/functional/settings-menu";
import { Chat } from "./(components)/Chat";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("ChatPage");

  return (
    <main className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full m-4 md:m-0 md:w-[--screen-w] h-[--screen-h]">
        <section
          className="header justify-between items-center"
          data-testid="header-section"
        >
          <div className="flex-col">
            <h1 className="text-lg md:text-2xl font-bold">{t("title")}</h1>
            <h2 className="text-xs md:text-lg font-medium text-gray-500 dark:text-gray-300">
              {t("description")}
            </h2>
          </div>

          <SettingsMenu />
        </section>

        <Chat />
      </div>
    </main>
  );
}
