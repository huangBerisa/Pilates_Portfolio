# 画像素材

## 現状

Figma から書き出した実素材を `public/images/` に配置済み。
すべて Figma のスロット寸法どおりの書き出しなので、`object-fit: cover` によるトリミングは発生しない。

| パス | 用途 | 実寸 | Figma のノード |
| --- | --- | --- | --- |
| `public/images/logo.png` | ヘッダーロゴ | 105×33 | `HeadBg/logo` 361:1256 |
| `public/images/lessons/control-flow.png` | Control Flow | 106×90 | `image` I156:996;120:504 |
| `public/images/lessons/shape-up-core.png` | Shape up Core | 106×90 | `image` I126:663;120:504 |
| `public/images/lessons/refresh-core.png` | Refresh Core | 106×90 | `image` I126:704;120:504 |
| `public/images/banner.png` | 「会員様にお届け」バナー | 411×153 | `Image` 352:1221 |
| `public/images/columns/column-morning.png` | 朝ヨガで心と体を目覚めさせる習慣 | 100×100 | `ArticleCard` 352:1224 |
| `public/images/columns/column-rainy.png` | 湿気に負けないカラダづくり | 100×100 | `ArticleCard` 352:1237 |
| `public/images/columns/column-detox.png` | 内側から整える 季節のデトックス習慣 | 100×100 | `ArticleCard` 352:1248 |

## 差し替え方

同じパスにファイルを置くだけでよい。`src/components/AssetImage.tsx` が
**`.png` → `.jpg` → `.webp` → `.svg`** の順に試すので、拡張子を揃える必要はない。

## 既知の課題 — 解像度

現在の素材はすべて **1x 書き出し**。iPhone の実機（2x / 3x）では拡大表示になり、
ロゴと写真がわずかに甘く見える。Figma の書き出し設定で **2x** にして同じパスに
置き換えると鮮明になる（サイズ指定は変更不要。CSS 側で実寸を指定しているため）。

- ロゴ: 210×66
- レッスン写真: 212×180
- バナー: 822×306
- コラム: 200×200
