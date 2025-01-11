import { NextRequest, NextResponse } from 'next/server';
import { getChatgptImages } from '@/services/openai';

export async function GET(req: NextRequest) {
  const prompt = req.nextUrl.searchParams.get('imagePrompt');

  try {
    if (!prompt) {
      return;
    }
    const data = await getChatgptImages(prompt);

    return NextResponse.json({ data });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 },
    );
  }
}
