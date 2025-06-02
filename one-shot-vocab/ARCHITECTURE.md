# One-Shot Vocab アーキテクチャ設計書

## 概要

One-Shot Vocabは、**AI技術を活用した英語ボキャブラリー学習特化型Webアプリケーション**です。ユーザーの職業や英語レベルに応じて個別化された学習体験を提供します。

## 技術スタック

### フロントエンド

- **Next.js 14** - Reactベースのフルスタックフレームワーク（App Router使用）
  https://nextjs.org/

- **TypeScript** - 型安全性を提供するJavaScriptの拡張

- **Chakra UI** - モダンで使いやすいUIコンポーネントライブラリ
  https://chakra-ui.com/

### バックエンド・サービス

- **Firebase Authentication** - ユーザー認証（メール/パスワード、Google OAuth）
- **Cloud Firestore** - NoSQLドキュメントデータベース
  https://firebase.google.com/?hl=ja

- **OpenAI API** - AI機能（GPT-3.5-turbo、DALL-E 2）
  https://openai.com/ja-JP/api/

### 開発・運用

- **Firebase Hosting** - Webアプリケーションのホスティング
- **ESLint & Prettier** - コード品質とフォーマット管理
- **SASS** - CSS拡張言語

## システム構成

```
┌─────────────────────────────────────────────────────────────┐
│                        ユーザー                               │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                   Next.js Frontend                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   Pages/Routes  │  │   Components    │  │   Contexts   │ │
│  │     (App Dir)   │  │   (Chakra UI)   │  │    (Auth)    │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                   API Layer                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │  Next.js API    │  │   OpenAI API    │  │ Firebase API │ │
│  │     Routes      │  │   Integration   │  │              │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                 External Services                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   Firebase      │  │    OpenAI       │  │  Firebase    │ │
│  │  Authentication │  │  (GPT/DALL-E)   │  │  Firestore   │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## ディレクトリ構造

```
one-shot-vocab/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # ホームページ（ログイン画面）
│   │   ├── layout.tsx         # 全体レイアウト
│   │   ├── providers.tsx      # グローバルプロバイダー設定
│   │   ├── api/               # APIエンドポイント
│   │   │   ├── openai/        # OpenAI関連API
│   │   │   └── dalle/         # DALL-E画像生成API
│   │   ├── components/        # 再利用可能UIコンポーネント
│   │   │   └── common/        # 共通コンポーネント
│   │   ├── contexts/          # Reactコンテキスト（状態管理）
│   │   ├── hooks/             # カスタムReactフック
│   │   ├── lib/               # 外部ライブラリ設定
│   │   ├── types/             # TypeScript型定義
│   │   ├── utils/             # ユーティリティ関数
│   │   ├── styles/            # グローバルスタイル
│   │   ├── assets/            # 静的資産（画像等）
│   │   ├── account/           # アカウント管理ページ
│   │   ├── register/          # ユーザー登録ページ
│   │   ├── search/            # 検索機能ページ
│   │   ├── payment/           # 決済ページ
│   │   └── logout/            # ログアウト処理
│   └── services/              # 外部サービス統合
│       └── openai.ts          # OpenAI API クライアント
├── public/                    # 静的ファイル
├── package.json               # 依存関係とスクリプト
├── tsconfig.json              # TypeScript設定
├── next.config.js             # Next.js設定
├── firebase.json              # Firebase設定
└── .firebaserc                # Firebase プロジェクト設定
```

## 主要機能とコンポーネント

### 1. 認証システム

- **GoogleOAuth認証**: `signInWithPopup`を使用
- **メール/パスワード認証**: `signInWithEmailAndPassword`を使用
- **認証状態管理**: Reactコンテキストで全体的な認証状態を管理
- **新規ユーザー判定**: Firestoreでユーザー存在確認後、新規登録へリダイレクト

### 2. AI機能統合

- **GPT-3.5-turbo**: 職業別ボキャブラリー生成、学習コンテンツ作成
- **DALL-E 2**: 単語学習用の視覚的補助画像生成

### 3. 学習機能

- **リスト機能**: AI生成された職業別必須ボキャブラリー学習
- **サーチ機能**: ユーザーが能動的に検索した単語の即座学習

## 開発・運用フロー

### 1. 開発環境
