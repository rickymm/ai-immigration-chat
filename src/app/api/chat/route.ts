import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    maxSteps: 4,
    model: openai("gpt-4-turbo"),
    system:
      "You're an Immigration expert. " +
      "Prefer answers with markdown. " +
      "Refer to yourself as Beacon",
    messages,
  });

  return result.toDataStreamResponse();
}
