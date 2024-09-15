import { callOpenAi } from "../openai";
import { extracting_action_items_prompt, extracting_action_items_json } from "./prompts";

export async function POST(req: Request) {
  const data: {transcript: string, notes: string}  = await req.json() as {transcript: string, notes: string};

  return callOpenAi({
    system_prompt: extracting_action_items_prompt,
    message_prompt: data.transcript,
    json_response: extracting_action_items_json
  });
}
