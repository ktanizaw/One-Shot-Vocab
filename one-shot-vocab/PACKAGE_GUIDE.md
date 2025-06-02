# Package.json 設定ガイド

このドキュメントでは、One-Shot Vocabプロジェクトの`package.json`に含まれる各項目について、初心者にもわかりやすく説明します。

## 基本情報

### プロジェクト設定

```json
{
  "name": "one-shot-vocab", // プロジェクト名
  "version": "0.1.0", // バージョン番号
  "private": true // npmレジストリへの公開を防ぐ
}
```

- **name**: プロジェクトの識別名。パッケージ名としても使用される
- **version**: セマンティックバージョニング（major.minor.patch）
- **private**: trueに設定することで、誤ってnpmに公開されることを防ぐ

## スクリプトコマンド

### 開発・ビルド関連

```json
"scripts": {
  "dev": "next dev",           // 開発サーバー起動（ホットリロード付き）
  "build": "next build",       // プロダクション用ビルド
  "start": "next start",       // プロダクション用サーバー起動
  "lint": "next lint",         // ESLintによるコード品質チェック
  "format": "prettier --write --ignore-path .gitignore '**/*.{js,ts,tsx,json,css}'", // Prettierによる自動コードフォーマット
  "debug": "NODE_OPTIONS='--inspect' next dev" // デバッグモードでの開発サーバー起動
}
```

#### 使用方法

```bash
npm run dev     # 開発環境での作業時に使用
npm run build   # 本番デプロイ前のビルド
npm run start   # ビルド後のアプリケーション起動
npm run lint    # コードの問題をチェック
npm run format  # コードを統一フォーマットに整形
```

## 依存関係（Dependencies）

### UI・デザインシステム関連

#### Chakra UI エコシステム

```json
"@chakra-ui/icons": "^2.1.1",     // Chakra UIのアイコンセット
"@chakra-ui/next-js": "^2.1.5",   // Chakra UIのNext.js統合パッケージ
"@chakra-ui/react": "^2.8.1",     // Chakra UIメインパッケージ（UIコンポーネントライブラリ）
```

- **役割**: モダンで使いやすいUIコンポーネントを提供
- **特徴**: アクセシビリティ対応、レスポンシブデザイン、テーマカスタマイズ可能

#### スタイリング・アニメーション

```json
"@emotion/react": "^11.11.1",     // CSS-in-JS ライブラリ（Chakra UIの依存関係）
"@emotion/styled": "^11.11.0",    // Emotionのスタイル付きコンポーネント
"framer-motion": "^10.16.4",      // アニメーションライブラリ（Chakra UIで使用）
"sass": "^1.72.0"                 // SCSS/SASSコンパイラ
```

- **Emotion**: CSS-in-JSによる効率的なスタイリング
- **Framer Motion**: 滑らかなアニメーション効果
- **Sass**: CSS拡張言語でより高度なスタイリング

### Firebase関連（バックエンドサービス）

```json
"@types/firebase": "^2.4.32",         // Firebase型定義
"firebase": "^11.0.2",                // Firebase SDK（認証・データベース）
"react-firebase-hooks": "^5.1.1"      // React用Firebaseフック
```

- **Firebase SDK**: 認証、データベース、ホスティングを提供
- **react-firebase-hooks**: ReactでFirebaseを簡単に使用するためのフック

### AI・API関連

```json
"openai": "^4.20.1",           // OpenAI API クライアント（GPT・DALL-E）
"googleapis": "^128.0.0",      // Google APIs クライアント
"axios": "^1.6.1"              // HTTP リクエストライブラリ
```

- **OpenAI**: GPT-3.5やDALL-E 2を使用したAI機能
- **googleapis**: Google関連サービスとの連携
- **Axios**: APIリクエストの送信・受信

### React・Next.js フレームワーク

```json
"next": "14.0.1",    // Next.js フレームワーク
"react": "^18",      // React ライブラリ
"react-dom": "^18"   // React DOM レンダリング
```

- **Next.js**: フルスタックReactフレームワーク（SSR、API Routes等）
- **React**: ユーザーインターフェース構築ライブラリ
- **React DOM**: ブラウザでのReactレンダリング

### その他ユーティリティ

```json
"consola": "^3.2.3"   // ログ出力ライブラリ
```

- **Consola**: 見やすいログ出力とデバッグ支援

## 開発依存関係（DevDependencies）

### TypeScript関連

```json
"@types/node": "^20",          // Node.js型定義
"@types/react": "^18",         // React型定義
"@types/react-dom": "^18",     // React DOM型定義
"typescript": "^5",            // TypeScriptコンパイラ
"ts-node": "^10.9.2"           // TypeScriptランタイム実行
```

- **役割**: 型安全性の確保、開発時のコード補完・エラー検出
- **本番環境**: 不要（コンパイル時のみ使用）

### コード品質・フォーマット関連

```json
"eslint": "^8.50.0",                    // ESLint（コード品質チェック）
"eslint-config-next": "14.0.1",         // Next.js用ESLint設定
"eslint-config-prettier": "^9.0.0",     // ESLintとPrettierの競合回避
"prettier": "^3.0.3"                    // Prettier（コードフォーマッター）
```

- **ESLint**: コードの問題を自動検出（バグ予防、コード規約チェック）
- **Prettier**: コードフォーマットの統一
- **eslint-config-next**: Next.js特有のルール設定

## バージョン記号の意味

### セマンティックバージョニング

- **^2.1.1**: マイナーアップデートまで自動更新（2.x.x）
- **~2.1.1**: パッチアップデートのみ自動更新（2.1.x）
- **2.1.1**: 固定バージョン（変更なし）

### 推奨運用

- **dependencies**: 本番環境で必要なパッケージ
- **devDependencies**: 開発時のみ必要なパッケージ
- **定期更新**: セキュリティアップデートの適用

## パッケージ管理コマンド

### インストール・更新

```bash
npm install                    # package.jsonに基づいて全依存関係をインストール
npm install <package-name>     # 新しいパッケージを追加
npm install -D <package-name>  # 開発依存関係として追加
```
