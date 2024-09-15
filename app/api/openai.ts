/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { env } from "@/env.mjs";
import { NextResponse } from "next/server";
import { OpenAI } from 'openai';

export async function callOpenAi({
  system_prompt,
  message_prompt,
  json_response,
}: {
  system_prompt: string,
  message_prompt: string,
  json_response: string | null,
}) {
  try {
    const openai = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
    });

    let request_message = `${message_prompt} with the following JSON response format: {"response": "text here"}`;
    if (json_response != null) {
      request_message = `${message_prompt} with the following JSON response format: ${JSON.stringify(json_response)}`;
    }

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: system_prompt },
        { role: "user", content: request_message }
      ],
      model: "gpt-4o-mini",
      max_tokens: 3000,
      response_format: { type: "json_object" },
      temperature: 0,
    });

    if (completion?.choices[0]?.message.content == undefined) {
      return NextResponse.json({message: 'No response from OpenAI', error: null, status: 500});
    }

    const textCompletion = completion.choices[0].message.content;
    return NextResponse.json({message: textCompletion, error: null, status: 200});
  } catch (error: unknown) {
    const errorMessage = (error as { message: string }).message || "An unexpected error occurred";
    const errorCode: number = (error as { status: number }).status || 500;

    return new Response(JSON.stringify({ message: errorMessage, error: error }), {
      status: errorCode
    });
  }
}
