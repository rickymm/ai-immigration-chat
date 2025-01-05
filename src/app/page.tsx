import { ProfileMenu } from "@/components/functional/profile-menu";
import { Chat } from "./(components)/Chat";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("ChatPage");

  return (
    <main className="w-full min-h-screen bg-background flex items-center justify-center">
      <div className="w-full m-4 md:m-0 md:w-[70vw] h-[95vh] grid grid-rows-[min-content_1fr_min-content]">
        <section className="border-b p-4 mb-4 flex flex-row justify-between items-center">
          <div className="flex-col">
            <h1 className="text-lg md:text-2xl font-bold">{t("title")}</h1>
            <h2 className="text-xs md:text-lg font-medium text-gray-500 dark:text-gray-300">
              {t("description")}
            </h2>
          </div>

          <ProfileMenu />
        </section>

        <Chat />
      </div>
    </main>
  );
}
