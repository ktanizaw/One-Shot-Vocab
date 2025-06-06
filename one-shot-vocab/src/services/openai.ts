import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: false, // ***注意*** クライアントサイドの実行を許可
});
export async function getChatgptAnswer(prompt: string) {
  const response = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-3.5-turbo',
    max_tokens: 200,
  });
  const answer = response.choices[0].message?.content;
  return answer;
}

export async function getChatgptImages(prompt: string) {
  const response = await openai.images.generate({
    model: 'dall-e-2',
    prompt: prompt,
    n: 2, // 生成する画像の数
    size: '256x256', // 画像のサイズ
  });
  return response.data;
}
