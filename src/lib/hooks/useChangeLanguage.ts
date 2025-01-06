"use client";

import { useRouter } from "next/navigation";

export function useChangeLanguage() {
  const { refresh } = useRouter();
  function handleSelectLanguage(lang: string) {
    document.cookie = `language=${JSON.stringify(lang)}`;
    refresh();
  }
  return handleSelectLanguage;
}
