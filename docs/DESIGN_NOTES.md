# 実装メモ（Figma ↔ コード対応）

Figma file: `s67a1QyH2FH1rpQ4XA7Ff3` / page `ビジュアルUI`

## 準拠する設計文書

実装は [DESIGN_SPEC_v1.0.md](./DESIGN_SPEC_v1.0.md)（LINEA Pilates UI/UX Design Specification v1.0）を
一次資料とする。Figma のアートボードと差異がある場合は仕様書を優先する（仕様書 Rule 1）。

## デザイントークン

仕様書 §3 / §4 / §5 / §6 / §7 の値を `src/styles/tokens.css` の CSS カスタムプロパティに落としている。

| 用途 | CSS | 値 | 仕様書 |
| --- | --- | --- | --- |
| Mauve / Dusty Rose | `--color-primary` | `#9A748B` | Primary CTA・Active・Brand accent |
| Deep Plum | `--color-ink` | `#554A56` | 本文・見出し・主要アイコン |
| Warm Ivory | `--color-canvas` | `#F8F5F2` | アプリ背景 |
| White | `--color-surface` | `#FFFFFF` | カード・ボトムナビ・モーダル |
| Soft Lavender | `--color-lavender` | `#C9C9D8` | 副次カテゴリ・非活性 |
| Sage Green | `--color-sage` | `#A9B7A0` | 完了・予約済 |
| Warm Beige | `--color-beige` | `#E9DED2` | キャンペーン |
| Gray | `--color-gray` | `#B8B4B6` | 二次テキスト・メタデータ |
| Icon inactive | `--color-icon-inactive` | `#A9A3A8` | §8 |

面・罫線用に `--color-primary-tint` / `--color-sage-tint` / `--color-line` を主色から導出しているが、
新しい色相は足していない（仕様書 §3.2 の配分 Neutral 70–80% を守るため）。

### タイポグラフィ（§4.2）

`28 / 22 / 17 / 15 / 13 / 11px`。H1→H3 と KPI は Medium、本文とキャプションは Regular。
数字は label より大きくする（`--text-kpi` 28px）。

### 余白・角丸・影

- 8pt system（§5.1 / Rule 5）: 左右マージン 20px / カード内 20px / カード間 16px / セクション間 32px
- 角丸（§6）: カード 20px・画像 16px・チップ 14px・ボタン 26px
- 影（§7）: `0 4px 20px rgba(80,60,70,0.06)`。強い黒影は使わない

## CRAP 四原則の適用（§2）

- **Contrast** — 色ではなく字級・字重・余白で階層を作る。H2 22px / H3 17px / caption 13px。
  Primary CTA は1画面1つ。
- **Repetition** — カードは `.lesson-card` 1種類のみ。予約中・予約可能・カレンダーで同じ構造を使う。
- **Alignment** — 左右マージンは `--margin-screen` 1か所でのみ決める。状態チップはカード上端の
  独立した行に置き、どのカードでも画像とレッスン名の基線が揃うようにしている。
- **Proximity** — Course Card を「識別情報 / 受講条件 / 行動」の3グループに分け、
  グループ間は罫線＋16px、グループ内は8pxで区切る。

## 表示サイズ

Figma のアートボードは 423px 幅だが、実装の基準端末は **iPhone 17（402 × 874 pt）** にしている。
レイアウトは flex / 可変幅で組んでいるため、幅が 21px 縮んでも破綻しない
（カード幅が 387px → 370px になるだけ）。

| 状況 | 表示 |
| --- | --- |
| ウィンドウに 402×874 が収まる | 等倍（scale 1） |
| 収まらない | 比率を保ったまま縮小（下限 0.4）。拡大はしない |
| 幅 460px 以下（実機） | 端末フレームを外して全画面（`100dvh`） |

倍率は `src/useStageFit.ts` が算出する。タイトルの高さは実測して差し引いているため、
フォント読み込みで高さが変わってもページに縦スクロールが出ない。
`transform: scale()` は元のレイアウト領域を変えないので、縮小後の実寸は
`.device-slot` ラッパーで確保している。

端末の角丸（55px）は `border-radius` + `overflow: hidden` に加えて `clip-path: inset(0 round ...)`
でも切り抜いている。内側のスクロール領域が合成レイヤーになると
`overflow: hidden` の角丸が効かず、角が四角く残ることがあるため。

## コンポーネント対応表

| コード | Figma ノード |
| --- | --- |
| `components/AppHeader.tsx` | `HeadBg` 335:1239 / `Head` 182:1029 |
| `components/StatusBar.tsx` | `UiLockTop` 292:1734 |
| `components/LessonCard.tsx` | `Card / Booking Card` 125:495 |
| `components/ReservationSlots.tsx` | `Card / Add Booking Card` 210:1320 + 予約カード横並び 182:801 |
| `components/SegmentedControl.tsx` | `Date_Chip/Segmented_Control` 113:827 / 182:1352 |
| `components/Chip.tsx` | `ChipsTag` 167:949 / `ChipsTagPuls` 182:1411 / `Closed` 349:1479 |
| `components/DateCardGroup.tsx` | `date_card_group` 325:1816 / `DateCard` 324:1792 |
| `components/WeekSelector.tsx` | `WeekSelector` 335:1292 |
| `components/SectionHeader.tsx` | `SectionHeader` 335:1354 |
| `components/LessonSummary.tsx` | `block1` 140:558 / 344:1308 |
| `components/ArticleCard.tsx` | `ArticleCard` 290:1566 |
| `components/Button.tsx` | `Button` 123:443 / 125:491 / `LoadMoreButton` 291:1624 |
| `components/Difficulty.tsx` | 仕様書 §13.3（Figma には無い。仕様書で追加） |
| `components/Toast.tsx` | `messageBox` 294:1874 |
| `components/BottomNav.tsx` | `Navigation / Bottom` 321:1741 / `Navigation_button` 316:1785 / `Icon/MemberCard` 233:1499 |
| `components/icons/nav.tsx` | `Icon/home` 231:1577 / `Icon/Calendar` 231:1583 / `Icon/Report` 231:1604 / `Icon/UseAndEarn` 231:1593 / `Icon/MembershipCard` 233:1491 |

## 予約枠スライダー

「ご予約中レッスン」は上限 3 枠ぶんのスライダー。`src/components/ReservationSlots.tsx`。

- 枠は常に 3 つ並び、左右にドラッグして送れる（マウスはポインタドラッグ、タッチは
  ネイティブスクロール、キーボードは ← → キー）
- 埋まっている枠は Course Card、空き枠はプレースホルダ
- 見出し横の「N件 / 3件」カウンタとドットは同じ `reserved` 配列から算出しているため、
  予約・取り消しと必ず一致する
- ドラッグ中は `scroll-snap` を外し、離したときにスナップさせる。
  6px 以上動いた直後のクリックは無効化してボタンの誤爆を防ぐ

## Figma からの意図的な差分

静的なカンプを「操作できるもの」にするうえで、次の点だけ判断を足している。
いずれもデザイン原則（配色・タイポ・余白・角丸）は変えていない。

0. **カラー・タイポ・余白・角丸・影のすべて**
   仕様書 v1.0 の値に置き換えている（Rule 1）。Figma の `#907280` 系より彩度の低い
   `#9A748B` / `#554A56` / `#F8F5F2` を使い、背景は白ではなく Warm Ivory。
   影も Figma の `0 0 2px rgba(0,0,0,.25)` は仕様書 §7 の「強い黒影の禁止」に反するため
   `0 4px 20px rgba(80,60,70,0.06)` に変更した。

1. **予約済みカードの CTA**
   Figma では予約済みカードにも「予約する」ボタンが置かれているが、操作可能にすると破綻するため
   「予約を取り消す」（Secondary Button）に差し替えている。
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
7. **人気度 → 難易度**
   Figma のハート＋数値（3 / 3.5）は意味が読み取りにくいため、仕様書 §10.3 / §13.3 の
   「Duration · Difficulty」に置き換えた。色に依存しないよう 初級/中級/上級 の文字と
   ●○○ のドットを併記している。

8. **カード内のボタンを1つに**
   Figma は「レッスン詳細」「予約する」の2つを同じ大きさのピルで並べていたが、
   仕様書 Rule 4（主要アクションは1つ）と可読性のため、詳細は文字リンクに落とした。

9. **日付書式の統一**
   Heuristic 04 に従い `06/11(木)` の MM/DD 表記に統一。週セレクタも
   「2026年6月11日-17日」→「2026/06/11 – 06/17」に変更した。

10. **アイコン・写真**
   下記「素材」を参照。
11. **レッスン時刻**
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
