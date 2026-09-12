# 画像素材の差し替え手順

## 現状

Figma に配置されている写真（レッスン画像・バナー・コラムのサムネイル）は、
この実装を行った環境から Figma のアセット配信元へ接続できなかったため、**同梱できていません**。
代わりに、ブランドカラーで組んだプレースホルダ SVG を `public/images/` に置いています。

## 差し替え方法

`public/images/<スロット名>.jpg` を置くだけで、そちらが自動的に優先して読み込まれます
（`src/components/AssetImage.tsx` が `.jpg` → `.svg` の順にフォールバックします）。
ファイルが無い場合は同梱のプレースホルダ SVG が表示されるので、1枚ずつ差し替えても壊れません。

## スロット一覧

| 置くパス | 用途 | 表示サイズ | Figma のノード |
| --- | --- | --- | --- |
| `public/images/lessons/control-flow.jpg` | Control Flow のサムネイル | 106×90（`object-fit: cover`） | `image` I156:996;120:504 |
| `public/images/lessons/shape-up-core.jpg` | Shape up Core のサムネイル | 106×90 | `image` I126:663;120:504 |
| `public/images/lessons/refresh-core.jpg` | Refresh Core のサムネイル | 106×90 | `image` I126:704;120:504 |
| `public/images/lessons/basic-align.jpg` | Basic Align のサムネイル（実装で追加した枠） | 106×90 | — |
| `public/images/banner.jpg` | 「会員様にお届け」バナー | 411×152 | `Image` 352:1221 |
| `public/images/columns/column-morning.jpg` | コラム「朝ヨガで心と体を目覚めさせる習慣」 | 100×100 | `ArticleCard` 352:1224 |
| `public/images/columns/column-rainy.jpg` | コラム「湿気に負けないカラダづくり」 | 100×100 | `ArticleCard` 352:1237 |
| `public/images/columns/column-detox.jpg` | コラム「内側から整える 季節のデトックス習慣」 | 100×100 | `ArticleCard` 352:1248 |

## Figma からの書き出し設定の目安

サムネイルは `object-fit: cover` で切り抜くため、被写体が中央寄りの写真が向いています。

- レッスンサムネイル: 横長（4:3 前後）／幅 640px 以上／JPEG 品質 80
- バナー: 824×304（2x）／JPEG
- コラム: 正方形 400×400（2x）／JPEG

書き出し後に `npm run build` し直せば反映されます。
