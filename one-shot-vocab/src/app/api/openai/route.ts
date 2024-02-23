import { NextRequest, NextResponse } from "next/server";
import { getChatgptAnswer } from "@/services/openai";

export async function GET(req: NextRequest) {
  const prompt = req.nextUrl.searchParams.get("prompt");
  try {
    if (!prompt) {
      return;
    }
    const data = await getChatgptAnswer(prompt);

    if (data !== null) {
      console.log("Received response:", data);
    } else {
      console.log("Received empty response from OpenAI");
    }
    return NextResponse.json({ data });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
