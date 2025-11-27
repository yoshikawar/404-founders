# 404 Not Founders

Next.js 14 + TypeScript で構築した HTTP/ネットワークエラー学習用リファレンスです。ガイドカテゴリや詳細なトラブルシューティング記事を検索しながら辿ることができます。

## 主な機能
- `/introduction` に用意した404の世界観を伝えるランディング
- カテゴリカードとDataTableで構成したガイド一覧（4xx/5xx/クライアントなど）
- 詳細ページでは原因・対処・再現手順・コードスニペットをセクション分けで表示
- サイト全体を横断するグローバル検索とショートカット (`/`, `Esc`)

## 開発の始め方
```bash
npm install
npm run dev
```

- `npm run build` : 本番ビルド
- `npm run start` : ビルド成果物を起動
- `npm run lint` : ESLint (Next.js推奨 + React Hooks) を実行

## ディレクトリ構成
- `app/` : Next.js App Router。`/detail/[category]/[slug]` などの各ページを定義
- `src/pages/` : 画面ごとのプレゼンテーションロジックを切り出したコンポーネント
- `src/components/` : レイアウト/UI/ガイドテーブル/共通部品 (`ui/` は shadcn ベース)
- `src/constants/` : ガイド定義や詳細データ、ナビゲーションの単一ソース
- `src/hooks/GlobalSearch*` : グローバル検索状態とショートカットの実装
- `src/lib/searchEntries.ts` : ガイド情報から検索インデックスを生成

Tailwind CSS と shadcn/ui をベースにした設計のため、ユーティリティ/トークンは `app/globals.css` と `tailwind.config.js` にまとめています。開発時は `SelfTests` コンポーネントの `console.assert` がデータ破損を検知するので、ブラウザコンソールに警告が出ていないか確認してください。
