import { callOpenAi } from "../openai";
import {
  extracting_action_items_prompt,
  extracting_action_items_json,
  identifying_agenda_prompt,
  identifying_agenda_json
} from "./prompts";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data: {transcript: string, todoList: string}  = await req.json() as {transcript: string, todoList: string};

  const agenda_response_json = await callOpenAi({
    system_prompt: identifying_agenda_prompt,
    message_prompt: `Transcript: ${data.transcript} \n TODO list: ${data.todoList}`,
    json_response: identifying_agenda_json
  });

  // const action_response_json = await callOpenAi({
  //   system_prompt: extracting_action_items_prompt,
  //   message_prompt: data.transcript,
  //   json_response: extracting_action_items_json
  // });

  console.log(data.transcript);

  if (agenda_response_json.error != null) {
    return NextResponse.json({
      message: null,
      error: {
        agenda: agenda_response_json.error,
        // action_items: action_response_json.error
      },
      status: 500
    });
  }

  return NextResponse.json({message: {
    agenda: JSON.parse(agenda_response_json.message),
    // action_items: JSON.parse(action_response_json.message)
  }, error: null, status: 200});
}
