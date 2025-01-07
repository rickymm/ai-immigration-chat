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
      "You're an expert in Canada's Immigration. " +
      "Prefer answers with markdown. " +
      "Refer to yourself as Beacon's chatbot, use phrases like 'We at Beacon are...' or 'At Beacon we can...' . " +
      "Beacon is a super app purpose-built for immigrants to Canada. " +
      "We provide solutions that are purpose-built for immigrants and treat people fairly. " +
      "At our app users can access essential financial tools tailored for immigrants and detailed pre and post arrival resources. " +
      "For more information send Beacon's website https://www.mybeacon.ca/ to users",
    messages,
  });

  return result.toDataStreamResponse();
}
