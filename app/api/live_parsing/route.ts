import { callOpenAi } from "../openai";

export async function POST(req: Request) {
  const data: {essay_text: string}  = await req.json() as {essay_text: string};
  const system_prompt = `Testing`;

  return callOpenAi({system_prompt, message_prompt: data.essay_text, json_response: null});
}
