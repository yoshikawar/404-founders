import type { Route } from "next";
import { Bug, ShieldAlert } from "lucide-react";

import { type GuideSection } from "@/types/guides";

function ServerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="6" rx="2" />
      <rect x="3" y="14" width="18" height="6" rx="2" />
      <path d="M7 7h.01M7 17h.01" />
    </svg>
  );
}

export const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: "http",
    route: "/http",
    icon: <ShieldAlert className="w-4 h-4" />,
    title: "HTTPの基礎",
    items: [
      { k: "メソッド", cause: "GET/POST/PUT/PATCH/DELETE", fix: "用途・冪等性を理解" },
      { k: "ステータス", cause: "1xx/2xx/3xx/4xx/5xx", fix: "公式の意味と根拠を確認" },
      { k: "ヘッダー", cause: "MIME/キャッシュ誤設定", fix: "Content-Type/Cache-Control/ETag" },
      { k: "ボディ/エンコーディング", cause: "エンコード/サイズ問題", fix: "UTF-8/圧縮/ストリーム" },
    ],
  },
  {
    id: "client-4xx",
    route: "/4xx",
    icon: <ShieldAlert className="w-4 h-4" />,
    title: "4xx クライアントエラー",
    detailCategory: "client-4xx",
    items: [
      { k: "400 Bad Request", cause: "構文/パラメータ不正", fix: "スキーマ検証とContent-Type整合" },
      { k: "401 Unauthorized", cause: "資格情報なし/期限切れ", fix: "Bearer付与と再ログイン" },
      { k: "403 Forbidden", cause: "権限不足/WAF拒否", fix: "RBAC見直しとログ確認" },
      { k: "404 Not Found", cause: "URLミス/成果物欠落", fix: "ルーティング整理とリダイレクト" },
      { k: "408 Request Timeout", cause: "送信遅延でタイムアウト", fix: "アップロード設計とtimeout調整" },
      { k: "413 Payload Too Large", cause: "ボディサイズ上限超過", fix: "ファイル検証と分割アップロード" },
      { k: "422 Unprocessable Content", cause: "意味的バリデーション違反", fix: "詳細なエラー返却と事前検証" },
      { k: "429 Too Many Requests", cause: "短時間の過剰リクエスト", fix: "Retry-After遵守とバックオフ" },
    ],
  },
  {
    id: "server",
    route: "/5xx",
    icon: <ServerIcon />,
    title: "5xx サーバエラー",
    detailCategory: "server",
    items: [
      { k: "500 Internal Server Error", cause: "未捕捉例外/依存失敗", fix: "例外ハンドラと監視強化" },
      { k: "502 Bad Gateway", cause: "上流ダウン/設定誤り", fix: "upstream確認とtimeout調整" },
      { k: "503 Service Unavailable", cause: "過負荷/メンテ", fix: "スケールとメンテ告知" },
      { k: "504 Gateway Timeout", cause: "上流応答遅延", fix: "クエリ最適化とタイムアウト設計" },
      { k: "3xx Redirect Loop", cause: "リダイレクト設定の衝突", fix: "www/httpルールの一本化" },
    ],
  },
  {
    id: "client",
    route: "/client",
    icon: <Bug className="w-4 h-4" />,
    title: "クライアントJS",
    detailCategory: "client",
    items: [
      { k: "DNS_PROBE_FINISHED_NXDOMAIN", cause: "DNS未設定/伝播遅延", fix: "レコード設定とキャッシュクリア" },
      { k: "ERR_SSL_PROTOCOL_ERROR", cause: "証明書チェーン/暗号設定不備", fix: "正しい証明書とTLS設定" },
      { k: "NET::ERR_CERT_AUTHORITY_INVALID / NET::ERR_CERT_COMMON_NAME_INVALID", cause: "証明書不一致/期限切れ", fix: "信頼CAで再発行・SAN整備" },
      { k: "CORS policy: No 'Access-Control-Allow-Origin' header", cause: "CORSヘッダー不足", fix: "Access-Control-Allow-* を設定" },
      { k: "Failed to fetch", cause: "ネットワークエラー/CORS", fix: "Networkタブ調査とCORS設定" },
      { k: "ERR_CONNECTION_RESET", cause: "接続がRSTで切断", fix: "ネットワーク/タイムアウト調整" },
      { k: "Mixed Content", cause: "HTTPSページでHTTPリソース読込", fix: "リソースURLのHTTPS統一" },
      { k: "JavaScript Runtime Error (TypeError / ReferenceError など)", cause: "未定義参照/JSON誤判定", fix: "防御的実装とログ確認" },
    ],
  },
];

export function findGuideSectionByRoute(route: Route) {
  return GUIDE_SECTIONS.find((section) => section.route === route);
}
