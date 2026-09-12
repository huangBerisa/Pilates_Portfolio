# LINEA ピラティス予約アプリ — UI/UX 再設計プロトタイプ

Figma で設計した「LAVAピラティス予約再設計」を、そのまま触れる Web プロトタイプとして実装したものです。
デザイントークン・コンポーネント・画面遷移すべて Figma の定義に対応させています。

- Figma: [LAVAピラティス予約再設計](https://www.figma.com/design/s67a1QyH2FH1rpQ4XA7Ff3/LAVA%E3%83%94%E3%83%A9%E3%83%86%E3%82%A3%E3%82%B9%E4%BA%88%E7%B4%84%E5%86%8D%E8%A8%AD%E8%A8%88)
- 技術構成: Vite + React 18 + TypeScript + 素の CSS（CSS カスタムプロパティでトークン管理）

## 動かす

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ に出力
npm run preview  # ビルド結果を確認
```

## 実装した画面と操作

| 画面 | Figma ノード | 操作 |
| --- | --- | --- |
| ホーム（予約なし） | `HomepageSection` 175:797 | 日付タブ切替 / 店舗フィルタ / もっと見る / 予約へ |
| ホーム（予約あり） | `予約済み` 182:778 | 予約中カードの横スクロール / 予約キャンセル / 予約数カウント |
| レッスン予約（カレンダー） | `カレンダー` 182:1024 | 探し方タブ / 店舗チップ / 週送り / 日付選択 / 予約へ |
| 予約内容確認 | `予約する確認画面` 140:547 | 予約確定 / 閉じる。詳細のみの閲覧モードあり |
| 予約完了 | `予約完了画面` 332:1832 | ホームへ戻る |
| Footer bar | `Navigation / Bottom` 321:1741 | ホーム / 予約 / 会員証 / レポート / 貯める・使う のタブ切替 |

### 動く仕様

- 予約は **3件まで**（Figma の「現在の予約数 1件/3件」に対応）。上限時は予約ボタンが無効になりトーストで通知。
- 予約すると、ホームの「ご予約中レッスン」にカードが積まれ、予約可能リストからは消える。
- 予約済みカードには `予約済` チップが付き、CTA が「予約キャンセル」に変わる。
- 満席枠（残席0）は `満席` 表示で予約不可。
- Footer bar は全タブ遷移する。会員証・レポート・貯める・使う の3画面は Figma に定義が無いため、
  導線だけ実装し「スコープ外」であることを明示するプレースホルダを表示する。
  予約確認・予約完了はシート表示のため Footer bar を出さない。
- 日付は Figma のアートボードに合わせて **2026/06/11(木) を「今日」** として固定している（`src/data/calendar.ts` の `TODAY`）。

## ディレクトリ

```
src/
├── styles/tokens.css       デザイントークン（Figma Variables と1対1）
├── styles/components.css   コンポーネントのスタイル（Figmaノード名をコメント併記）
├── components/             Figma のコンポーネント単位で分割
├── components/icons/       アイコン（インライン SVG）/ nav.tsx は Footer bar 用
├── screens/                画面4種
├── state/BookingContext.tsx 予約状態と画面遷移
└── data/                   レッスン・店舗・コラム・文言のダミーデータ
```

詳細は [docs/DESIGN_NOTES.md](docs/DESIGN_NOTES.md)、画像素材の差し替え手順は
[docs/FIGMA_ASSETS.md](docs/FIGMA_ASSETS.md) を参照してください。

## デプロイ

- **GitHub Pages**: `main` へ push すると `.github/workflows/deploy.yml` が自動でビルド・公開します。
  リポジトリの Settings → Pages → Source を **GitHub Actions** に設定してください。
- **Vercel / Netlify**: ビルドコマンド `npm run build`、出力ディレクトリ `dist` を指定するだけで動きます。
