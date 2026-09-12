# 実装メモ（Figma ↔ コード対応）

Figma file: `s67a1QyH2FH1rpQ4XA7Ff3` / page `ビジュアルUI`

## デザイントークン

Figma の Variables をそのまま `src/styles/tokens.css` の CSS カスタムプロパティに落としている。

| Figma 変数 | CSS | 値 | 用途 |
| --- | --- | --- | --- |
| 粉黑 | `--color-ink` | `#4D4552` | 本文・見出し |
| 深粉紫 | `--color-primary` | `#907280` | ブランド主色・主要ボタン・選択状態 |
| 粉色(枠線) | `--color-primary-border` | `#B79AA7` | 枠線・破線・区切り |
| 粉色 | `--color-accent` | `#F1E5E7` | 淡いアクセント面・選択チップ・トースト |
| 粉色(濃) | `--color-accent-deep` | `#EDDEE0` | グラデーション終点 |
| 淺粉灰 | `--color-surface-warm` | `#F1EDEB` | 非選択セグメントの面 |
| 米白 | `--color-cream` | `#F7F4EF` | 反転文字 |
| 粉綠 | `--color-success` | `#ABB5A1` | 予約済・完了チェック |
| fill_icon | `--color-icon` | `#222222` | ヘッダーアイコン |
| line_gray | `--color-line` | `#D1D1D1` | 罫線・非選択の日付カード枠 |
| bg_white | `--color-bg` | `#FFFFFF` | 画面背景 |

### タイポグラフィ

Figma の Typography フレーム（13:7）のスケールをそのまま採用。

`28 / 22 / 18 / 16 / 14 / 12`（+ チップ用の `10 / 8`）px、フォントは **Noto Sans JP**（400 / 500 / 700）。
ロゴのみ **Cormorant Garamond**。

### 角丸・影

- カード: `14px` / 画像サムネイル: `14px`（一覧）・`8px`（確認画面）/ ピル: `100px`
- 影: `0 0 2px rgba(0,0,0,.25)`（カード）、`0 0 4px rgba(0,0,0,.25)`（予約なしカード・トースト）

## コンポーネント対応表

| コード | Figma ノード |
| --- | --- |
| `components/AppHeader.tsx` | `HeadBg` 335:1239 / `Head` 182:1029 |
| `components/StatusBar.tsx` | `UiLockTop` 292:1734 |
| `components/BookingCard.tsx` | `Card / Booking Card` 125:495 |
| `components/AddBookingCard.tsx` | `Card / Add Booking Card` 210:1320 |
| `components/SegmentedControl.tsx` | `Date_Chip/Segmented_Control` 113:827 / 182:1352 |
| `components/ChipsTag.tsx` | `ChipsTag` 167:949 / `ChipsTagPuls` 182:1411 / `Closed` 349:1479 |
| `components/DateCardGroup.tsx` | `date_card_group` 325:1816 / `DateCard` 324:1792 |
| `components/WeekSelector.tsx` | `WeekSelector` 335:1292 |
| `components/SectionHeader.tsx` | `SectionHeader` 335:1354 |
| `components/LessonSummary.tsx` | `block1` 140:558 / 344:1308 |
| `components/ArticleCard.tsx` | `ArticleCard` 290:1566 |
| `components/Button.tsx` | `Button` 123:443 / 125:491 / `LoadMoreButton` 291:1624 |
| `components/Toast.tsx` | `messageBox` 294:1874 |
| `components/BottomNav.tsx` | `Navigation / Bottom` 321:1741 / `Navigation_button` 316:1785 / `Icon/MemberCard` 233:1499 |
| `components/icons/nav.tsx` | `Icon/home` 231:1577 / `Icon/Calendar` 231:1583 / `Icon/Report` 231:1604 / `Icon/UseAndEarn` 231:1593 / `Icon/MembershipCard` 233:1491 |

## Figma からの意図的な差分

静的なカンプを「操作できるもの」にするうえで、次の点だけ判断を足している。
いずれもデザイン原則（配色・タイポ・余白・角丸）は変えていない。

1. **予約済みカードの CTA**
   Figma では予約済みカードにも「予約する」ボタンが置かれているが、操作可能にすると破綻するため
   「予約キャンセル」（`--color-accent` のソフトボタン）に差し替えている。
2. **状態チップの出し分け**
   `予約済` / `今日` のチップ行は、Figma のホーム画面インスタンスでは非表示、予約済み画面では表示。
   実装では「予約済み」「満席」のカードにだけチップ行を出す。
3. **ご注意事項の重複行**
   Figma の本文（140:602）は見出しと同じ「ご注意事項」から始まっていたため、本文側の1行目を削除した。
4. **満席・残席**
   Figma には状態バリエーション（`Closed`）だけがあり具体的な残席表現はないため、
   ダミーデータで残席0の枠を用意し `満席` として予約不可にしている。
5. **空状態・上限到達**
   条件に合うレッスンが0件のときのテキスト、予約3件到達時のトーストは Figma に無いため追加。
6. **Footer bar の遷移先**
   Figma には Footer bar のコンポーネント（アイコンの Normal / hover、中央の会員証ボタン）まで定義があり、
   各タブの画面は含まれていない。導線を殺さないため、会員証・レポート・貯める・使う の3タブは
   「今回のスコープ外」と明示するプレースホルダ画面へ遷移させている。
   また予約確認・予約完了はシート表示のため Footer bar を非表示にしている。
7. **アイコン・写真**
   下記「素材」を参照。
8. **レッスン時刻**
   Figma の Refresh Core は「21:04~21:50 (45分)」と表記が不整合だったため、
   実装では開始時刻＋所要時間から終了時刻を算出している（21:04~21:49）。

## 素材について

Figma 上の写真・SVG アセットは、実装環境からFigmaのアセットCDNへ接続できなかったため同梱できていない。

- **アイコン**: Figma と同じ外形サイズ（14 / 16 / 24 / 96px、Footer bar は 24px と 25×20px）で
  インライン SVG として再構成（`src/components/icons/index.tsx`、`src/components/icons/nav.tsx`）。
  Footer bar のアイコンは Figma の Normal / hover バリアントに合わせ、選択中は塗りに切り替わる。
- **写真**: ブランドカラーで組んだプレースホルダ SVG を `public/images/` に同梱。
  差し替え手順は [FIGMA_ASSETS.md](./FIGMA_ASSETS.md)。

## アクセシビリティ

- セグメント・日付カードは `role="tablist"` / `aria-selected`、店舗チップは `aria-pressed`。
- 装飾 SVG はすべて `aria-hidden`。アイコンのみのボタンには `aria-label`。
- `:focus-visible` にブランド色のフォーカスリング。
- `prefers-reduced-motion` でアニメーションを無効化。
