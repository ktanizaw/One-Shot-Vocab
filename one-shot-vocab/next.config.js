/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY,
    NEXT_PUBLIC_CUSTOM_SEARCH_ENGINE_ID:
      process.env.NEXT_PUBLIC_CUSTOM_SEARCH_ENGINE_ID,
    NEXT_PUBLIC_WORDS_API_KEY: process.env.NEXT_PUBLIC_WORDS_API_KEY,
    NEXT_PUBLIC_OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  },
  serverRuntimeConfig: {
    // サーバーサイドで利用する環境変数を設定する
    NEXT_PUBLIC_OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  },
};
module.exports = nextConfig;
