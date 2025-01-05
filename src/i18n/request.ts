import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const storedLanguage = (await cookies()).get("language");

  const locale = storedLanguage
    ? (JSON.parse(storedLanguage.value) as string)
    : "en";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
