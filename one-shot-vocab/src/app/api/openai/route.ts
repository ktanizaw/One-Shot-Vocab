import { NextRequest, NextResponse } from "next/server";
import { getChatgptAnswer } from "@/services/openai";

export async function GET(req: NextRequest) {
  const { prompt } = await req.json();
  try {
    const data = await getChatgptAnswer("tell me your name");

    if (data !== null) {
      console.log("Received response:", data);
    } else {
      console.log("Received empty response from OpenAI");
    }
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
