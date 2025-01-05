import { ClassValue } from "clsx";
import Markdown from "markdown-to-jsx";

export function MarkdownReader({
  content,
  className,
}: {
  content: string;
  className?: ClassValue;
}) {
  return (
    <Markdown
      className={(className as string) ?? undefined}
      options={{
        overrides: {
          h1: { props: { className: "text-lg font-semibold py-2" } },
          h2: { props: { className: "text-base font-semibold py-2" } },
          h3: { props: { className: "text-base font-medium py-2" } },
          ul: { props: { className: "pl-6 pb-3" } },
          ol: { props: { className: "pl-6 pb-3" } },
          a: { props: { className: "underline text-indigo-500" } },
        },
      }}
    >
      {content}
    </Markdown>
  );
}
