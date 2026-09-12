# LINEA Pilates UI/UX Design Specification
## Claude 專用・皮拉提斯 App 設計規範 v1.0

> **用途**
> 本文件是提供給 Claude 進行 UI/UX 設計、畫面生成、元件設計、HTML/CSS/React UI 實作時使用的「設計約束文件」。
>
> **核心目標**
> 建立一套具有「優雅、專業、平衡、療癒感」的 Pilates 品牌數位體驗。
>
> **參考方向**
> 本規範以提供的 LINEA Pilates 參考畫面為視覺基準：低飽和莫蘭迪色、米白背景、柔和圓角、大量留白、女性身體動作攝影、精緻細線 icon、清楚的課程資訊層級。

---

# 1. Design Identity｜設計定位

## 1.1 品牌關鍵字

所有 UI 設計應優先符合以下 6 個關鍵字：

- **Elegant｜優雅**
- **Calm｜平靜**
- **Balanced｜平衡**
- **Professional｜專業**
- **Soft｜柔和**
- **Premium｜高級感**

避免：

- 過度鮮豔
- 過度科技感
- 高密度資訊
- 強烈霓虹色
- 過度裝飾
- 卡通化
- 過多陰影
- 過度玻璃擬態
- 過度使用漸層

### 品牌情緒

UI 應讓使用者產生：

> 「這是一個可以讓我慢下來、專注身體、安心預約課程的空間。」

而不是：

> 「這是一個充滿促銷、數據和功能的健身 App。」

---

# 2. Four Core Design Principles｜四大設計原則

本產品採用 **CRAP 四大視覺設計原則**：

1. Contrast｜對比
2. Repetition｜重複
3. Alignment｜對齊
4. Proximity｜親密性

這四項原則必須同時與 Pilates 品牌的「平衡」概念結合。

---

## 2.1 Contrast｜對比

### 目的
建立清楚的資訊層級，讓使用者第一眼知道「現在最重要的是什麼」。

### UI 規則

優先使用：

- 字級對比
- 字重對比
- 深淺色對比
- 大小對比
- 留白對比
- 圖像與文字對比

不要依賴：

- 強烈色彩
- 厚重陰影
- 大量邊框

### 建議階層

```text
Primary Title
32–36px / Medium

Section Title
22–24px / Medium

Card Title
16–18px / Medium

Body
14–16px / Regular

Secondary
12–14px / Regular
```

### CTA

Primary CTA 必須與背景有明確辨識度。

例如：

- Mauve filled button
- Dark plum filled button

Secondary CTA 使用：

- Transparent
- 1px outline
- 品牌主色文字

---

## 2.2 Repetition｜重複

### 目的
建立品牌一致性與使用者的學習成本降低。

必須重複：

- 圓角規則
- 色彩系統
- Button 樣式
- Icon 線條風格
- Card 結構
- Typography
- 間距系統
- 圖片比例

### Card

同一類型的卡片不可出現多套視覺語言。

例如：

```text
課程卡片
↓
所有課程卡片使用相同：
圖片比例
圓角
文字層級
時間資訊
教練資訊
CTA
```

---

## 2.3 Alignment｜對齊

### 目的
建立「秩序感」。

Pilates 本身強調身體排列，因此 UI 的 alignment 必須非常嚴謹。

### 規則

主要內容區域：

```text
Screen Margin
= 20–24px

Card Internal Padding
= 16–20px

主要文字左對齊
```

避免：

- 任意置中
- 不一致的文字起始點
- 元件上下不在同一基線
- Button 高度不一致

### 特別規則

課程列表中的：

```text
日期
圖片
課程名稱
教練
時間
難度
CTA
```

應形成固定欄位結構。

---

## 2.4 Proximity｜親密性

### 目的
讓「有關係的資訊靠近」，讓「不同資訊保持距離」。

例如：

```text
課程名稱
教練
↓
視為同一資訊群

時間
課程長度
難度
↓
視為課程條件群

預約 Button
↓
視為行動群
```

不要把：

```text
課程名稱
──────

時間

──────

教練

──────

難度
```

全部平均分散，造成資訊關係不清楚。

### 核心原則

> **Spacing is information architecture.**
>
> 間距本身就是資訊架構。

---

# 3. Visual Design System｜視覺設計系統

## 3.1 Color Palette

參考畫面採用低飽和、暖色系 Pilates aesthetic。

### Primary

```text
Mauve / Dusty Rose
#9A748B
```

用途：

- Primary CTA
- Active navigation
- Brand accent
- Selected state
- Important highlight

### Deep Plum

```text
#554A56
```

用途：

- Primary text
- Strong icon
- Header
- Important data

### Warm Ivory

```text
#F8F5F2
```

用途：

- App background
- Large empty areas

### White

```text
#FFFFFF
```

用途：

- Cards
- Bottom navigation
- Modal
- Content containers

### Soft Lavender

```text
#C9C9D8
```

用途：

- Secondary category
- Decorative background
- Inactive state

### Sage Green

```text
#A9B7A0
```

用途：

- Wellness
- Recovery
- Success
- Calm status

### Warm Beige

```text
#E9DED2
```

用途：

- Promotion
- New user
- Course campaign

### Gray

```text
#B8B4B6
```

用途：

- Secondary text
- Disabled
- Metadata

---

## 3.2 Color Usage Ratio

建議：

```text
Neutral / Ivory / White     70–80%
Soft brand colors           15–20%
Strong accent               5–10%
```

**不要讓紫灰色成為整個畫面的背景。**

品牌色應該像「瑜伽服或室內軟裝的點綴」，而不是整個健身 App 的高強度色彩。

---

# 4. Typography｜文字系統

## 4.1 語氣

文字應：

- 簡潔
- 柔和
- 專業
- 不命令式
- 不過度促銷

### Preferred

```text
立即預約課程
查看課程
開始體驗
查看進度
```

### Avoid

```text
立即搶購！
最後機會！
你還不來嗎？
超級優惠！
```

---

## 4.2 Typography Hierarchy

### H1

```text
28–36px
Medium
```

用途：

首頁 Hero / Page Title

### H2

```text
22–24px
Medium
```

用途：

Section Title

### H3

```text
17–18px
Medium
```

用途：

Card Title

### Body

```text
14–16px
Regular
```

### Caption

```text
12–13px
Regular
```

### Number / KPI

```text
28–36px
Regular / Medium
```

數字應比 label 大，形成清楚的視覺層級。

---

# 5. Layout System｜版面系統

## 5.1 Grid

Mobile First：

```text
左右 Margin
20px

Card Gap
12–16px

Section Gap
28–40px

Element Gap
8 / 12 / 16 / 24px
```

使用 4pt / 8pt spacing concept。

---

## 5.2 White Space

留白是本品牌的重要視覺資產。

### Rule

寧可：

```text
多 20% 留白
```

也不要：

```text
多 20% 資訊
```

Pilates UI 必須有「呼吸感」。

---

# 6. Shape & Radius｜形狀與圓角

### Card

```text
Radius: 20–24px
```

### Button

```text
Radius: 24–28px
```

### Small Chip

```text
Radius: 12–16px
```

### Image

```text
Radius: 12–20px
```

### 原則

避免大量使用：

```text
0px sharp corners
```

因為與品牌的柔和定位衝突。

但也不要全部變成：

```text
100% pill
```

只有 Button / Chip 等互動元件適合使用 pill。

---

# 7. Shadow｜陰影

採用非常輕的 elevation。

### Card

```text
0 4px 20px
rgba(80, 60, 70, 0.06)
```

### Modal

```text
0 12px 40px
rgba(60, 50, 60, 0.12)
```

禁止：

- 強烈黑色陰影
- Neumorphism
- 高對比 drop shadow

視覺感受應該是：

> Floating softly

而不是：

> Floating dramatically

---

# 8. Iconography｜Icon 系統

參考畫面採用：

- Thin line
- Rounded stroke
- Minimal detail
- Elegant silhouette

### Icon

```text
Stroke: 1.5–2px
Line cap: Round
Line join: Round
```

### Icon Size

```text
Navigation: 24px
Action: 20–24px
Metadata: 16–18px
```

### Icon Color

Primary：

```text
#554A56
```

Inactive：

```text
#A9A3A8
```

Active：

```text
#9A748B
```

### 原則

一個畫面只能使用一種主要 icon style。

禁止混用：

- Filled icon
- 3D icon
- Emoji
- Thick icon
- Thin icon

---

# 9. Photography｜影像規範

攝影是 Pilates 品牌的重要情緒來源。

## Recommended

- Natural daylight
- Soft sunlight
- Neutral interior
- Beige / white / wood environment
- Natural skin tone
- Calm movement
- Controlled posture
- Elegant composition

## Avoid

- 高飽和健身房
- 過度肌肉展示
- 強烈黑紅健身風
- 過度性感構圖
- 高對比燈光
- 過度商業化 stock photo

### Composition

人物不一定要位於正中央。

可以利用：

```text
人物 + 大量留白
人物 + Architecture
人物 + Curved shape
```

建立 premium editorial feeling。

---

# 10. Component System｜元件規範

## 10.1 Primary Button

```text
Background: #9A748B
Text: #FFFFFF
Height: 48–52px
Radius: 26px
Horizontal padding: 20–24px
```

Interaction：

```text
Default
Hover
Pressed
Disabled
Loading
```

---

## 10.2 Secondary Button

```text
Background: transparent
Border: 1px solid #9A748B
Text: #9A748B
Height: 48–52px
Radius: 26px
```

---

## 10.3 Course Card

固定資訊層級：

```text
[Date / Time]

[Course Image]

Course Name
Instructor

Duration · Difficulty

[Reserve]
```

### CTA 狀態

```text
可預約
→ 預約

已預約
→ 已預約

已額滿
→ 已額滿

進行中
→ 上課簽到

已完成
→ 查看紀錄
```

禁止只依靠顏色判斷狀態。

---

# 11. Navigation｜導航

Bottom Navigation 建議：

```text
首頁
課程
探索
我的
更多
```

### Active State

使用：

- Mauve
- Slight visual emphasis
- Icon + label

### Inactive

使用：

- Neutral gray
- Lower contrast

### Rule

目前所在位置必須始終清楚。

---

# 12. Nielsen's 10 Usability Heuristics｜尼爾森 10 大經驗法則

以下規則是本產品的核心 UX QA checklist。

---

## 01 Visibility of System Status
### 系統狀態可見性

使用者必須知道：

- 預約是否成功
- 課程是否已滿
- 是否正在載入
- 是否付款成功
- 是否簽到成功
- 是否儲存成功

### UI

不要：

```text
點擊 → 沒反應
```

應：

```text
點擊
↓
Loading
↓
Success
↓
狀態更新
```

例如：

```text
預約課程
→ 預約中...
→ 預約成功 ✓
```

---

# 02 Match Between System and Real World
## 系統與真實世界相符

使用 Pilates 使用者熟悉的語言。

使用：

```text
課程
教練
預約
簽到
器械
Reformer
Mat
難度
課程時間
```

避免工程術語：

```text
Transaction
Request
Payload
Status Code
```

---

# 03 User Control and Freedom
## 使用者控制與自由

使用者可以：

- 取消預約
- 修改預約
- 返回上一頁
- 關閉 Modal
- 取消搜尋
- 重新選擇課程

高風險操作必須提供：

```text
取消
確認
```

例如：

> 確定要取消 5/25 09:30 的 Reformer 課程嗎？

---

# 04 Consistency and Standards
## 一致性與標準

相同功能必須使用相同 UI。

例如：

```text
所有預約
= 同一種 Button

所有課程
= 同一種 Card

所有日期
= 同一種格式
```

日期格式應統一：

```text
05/20
10:00
```

不要同時出現：

```text
2026/05/20
5月20日
05-20
```

---

# 05 Error Prevention
## 錯誤預防

最好的錯誤訊息不是錯誤發生後才告訴使用者，而是提前避免。

例如：

課程已額滿：

```text
不要讓使用者點擊「預約」
```

而是：

```text
已額滿
```

預約時間衝突：

```text
你已有一堂 10:00 的課程
無法同時預約 10:00 的課程
```

---

# 06 Recognition Rather Than Recall
## 辨識而非回憶

不要要求使用者記住：

- 教練名字
- 課程名稱
- 上課時間
- 預約狀態

直接顯示。

例如：

```text
我的課程

05/25
09:30

Reformer 進階雕塑
Lena 教練
```

而不是：

```text
輸入你想找的課程
```

---

# 07 Flexibility and Efficiency of Use
## 彈性與效率

新手需要：

```text
清楚的導覽
```

熟悉使用者需要：

```text
快速操作
```

因此可以提供：

- 最近課程
- 再次預約
- 我的常用教練
- 我的常上課程
- 快速預約
- 收藏

例如：

```text
再次預約
Reformer 基礎核心
Annie 教練
[預約]
```

---

# 08 Aesthetic and Minimalist Design
## 美學與極簡設計

這是本產品最重要的原則之一。

每個畫面都要問：

> 「這個元素真的需要存在嗎？」

首頁優先：

```text
Hero
↓
主要 CTA
↓
本週課程
↓
優惠 / 活動
↓
個人進度
```

不要把所有資訊一次塞入首頁。

### Information Priority

```text
Primary
↓
課程 / 預約

Secondary
↓
我的課程 / 進度

Tertiary
↓
活動 / 其他資訊
```

---

# 09 Help Users Recognize, Diagnose, and Recover from Errors
## 協助辨識、診斷與修復錯誤

錯誤訊息必須回答三件事：

```text
發生什麼？
為什麼？
怎麼辦？
```

### Bad

```text
Error 500
```

### Good

```text
課程資料暫時無法取得

請稍後再試。
[重新載入]
```

### 網路錯誤

```text
目前網路連線不穩定
請確認網路後再試一次。

[重新載入]
```

---

# 10 Help and Documentation
## 協助與說明文件

如果功能本身需要說明，必須提供：

- Tooltip
- FAQ
- Help
- 操作教學
- 課程說明

例如新手第一次看到：

```text
Reformer
```

可以提供：

```text
Reformer 是使用彈簧阻力進行訓練的 Pilates 器械。
```

---

# 13. Pilates-specific UX｜皮拉提斯專屬 UX 原則

## 13.1 Body-first

產品核心不是「看數字」，而是：

```text
預約
→ 運動
→ 記錄
→ 進步
```

數據應該服務於身體體驗。

---

## 13.2 Progress Visualization

進度不要只顯示：

```text
12 次
```

可以轉化成：

```text
本月完成
8 / 10 次

連續訓練
4 週

累積課程
12 堂
```

但避免把 App 做成競技型健身產品。

---

## 13.3 Difficulty

建議：

```text
初階
中階
進階
```

視覺上使用：

```text
●○○
●●○
●●●
```

不要只使用：

```text
紅 / 黃 / 綠
```

避免色盲使用者無法辨識。

---

# 14. Accessibility｜無障礙規範

## Minimum

- Body text ≥ 14px
- Touch target ≥ 44×44px
- Icon button 必須有 accessible label
- 不可只依靠顏色傳達狀態
- 文字與背景保持足夠對比
- 錯誤訊息必須有文字說明

### Button

```text
最小可點擊區域
44 × 44px
```

---

# 15. Interaction｜互動規範

所有互動元素至少設計：

```text
Default
Pressed
Disabled
Loading
Success
Error
```

### Transition

推薦：

```text
150–250ms
Ease-out
```

不要使用：

- 彈跳過強
- 大幅縮放
- 旋轉
- 過度動畫

動畫應該像呼吸：

> Smooth / Soft / Controlled

---

# 16. Home Screen Information Architecture｜首頁資訊架構

推薦順序：

```text
┌──────────────────────────┐
│ Header                   │
│ Logo        Notification │
├──────────────────────────┤
│                          │
│ Hero / Brand Message     │
│                          │
│ Primary CTA              │
│                          │
├──────────────────────────┤
│ Quick Navigation         │
│                          │
│ 預約｜我的課程｜課程方案 │
│ 教練｜進度                │
├──────────────────────────┤
│ 本週課程                  │
│                          │
│ Course Card               │
│ Course Card               │
│ Course Card               │
├──────────────────────────┤
│ Promotion                 │
├──────────────────────────┤
│ Personal Progress         │
├──────────────────────────┤
│ Bottom Navigation         │
└──────────────────────────┘
```

---

# 17. Claude Implementation Rules｜給 Claude 的實作規則

當 Claude 根據本規範產生 UI 時，必須遵守以下規則：

## Rule 1
**不要自行改變品牌色。**

如果沒有特殊需求，使用本文件的 Color Palette。

## Rule 2
**不要增加無必要的 UI 元件。**

優先：

```text
Whitespace
Hierarchy
Typography
```

而不是：

```text
Borders
Shadows
Decorations
```

## Rule 3
**所有 Card 必須保持一致。**

不要每個 Section 都設計不同 Card。

## Rule 4
**Primary CTA 每個畫面最多 1 個主要行動。**

例如：

```text
立即預約
```

不要同時：

```text
立即預約
開始體驗
查看方案
加入收藏
分享
購買
```

全部搶視覺焦點。

## Rule 5
**使用 8pt spacing system。**

優先：

```text
8
16
24
32
40
48
```

## Rule 6
**保持大量留白。**

如果資訊太多：

> 優先刪減、分組、折疊，而不是縮小字體。

## Rule 7
**禁止使用高飽和色彩作為主要 UI 色。**

## Rule 8
**所有錯誤狀態都必須提供 Recovery Action。**

例如：

```text
錯誤
↓
原因
↓
重新載入
```

## Rule 9
**所有互動狀態都必須可辨識。**

不要只改顏色。

## Rule 10
**設計必須同時符合 CRAP 四大原則 + Nielsen 10 Heuristics。**

---

# 18. UI Review Checklist｜UI 最終檢查表

Claude 在完成任何畫面後，請依以下順序自行檢查：

### Visual

- [ ] 是否符合 Elegant / Calm / Balanced？
- [ ] 是否使用低飽和色？
- [ ] 是否有足夠留白？
- [ ] 是否存在清楚的視覺階層？
- [ ] Card / Button / Icon 是否一致？
- [ ] 是否符合 Contrast？
- [ ] 是否符合 Repetition？
- [ ] 是否符合 Alignment？
- [ ] 是否符合 Proximity？

### UX

- [ ] 使用者是否知道目前在哪裡？
- [ ] 是否知道系統目前狀態？
- [ ] 是否能取消或返回？
- [ ] 是否有錯誤預防？
- [ ] 是否不需要使用者記憶資訊？
- [ ] 是否提供快速操作？
- [ ] 是否移除了不必要資訊？
- [ ] 錯誤是否提供解決方式？
- [ ] 是否需要 Help / FAQ？

### Accessibility

- [ ] Touch target ≥ 44px？
- [ ] 不依賴顏色判斷？
- [ ] 文字可讀？
- [ ] Icon 有語意？
- [ ] Disabled / Loading / Error 狀態清楚？

---

# 19. Final Design Direction｜最終設計方向

整個 Pilates App 的 UI 應該呈現：

```text
Premium
    ↓
Elegant
    ↓
Calm
    ↓
Simple
    ↓
Useful
```

而不是：

```text
Fitness
    ↓
Aggressive
    ↓
High Contrast
    ↓
Data Heavy
    ↓
Commercial
```

## One-line Design Principle

> **「像 Pilates 一樣設計 UI：少而準、穩定、有節奏、保留呼吸感。」**

---

# 20. Claude Prompt Template｜直接提供給 Claude

每次要求 Claude 設計新畫面時，可以附上：

```text
請嚴格遵循《LINEA Pilates UI/UX Design Specification》。

設計時必須：
1. 使用本規範的 Color Palette。
2. 遵守 CRAP 四大設計原則：
   Contrast / Repetition / Alignment / Proximity。
3. 遵守 Nielsen 10 Usability Heuristics。
4. 使用 8pt spacing system。
5. 保持大量留白與低資訊密度。
6. 使用柔和圓角與極輕陰影。
7. Icon 使用 thin-line、rounded stroke。
8. UI 氣質維持 Elegant / Calm / Balanced / Professional。
9. 不使用高飽和色彩。
10. 不新增與產品需求無關的裝飾。
11. 所有互動元件都要考慮 Default / Pressed / Disabled / Loading / Success / Error。
12. 所有錯誤狀態都必須提供使用者下一步可以執行的 Recovery Action。
13. 不可只依靠顏色傳達資訊。
14. 優先維持資訊架構與可用性，而不是增加視覺效果。

如果需求與本規範衝突：
優先順序為：
UX / Accessibility
→ Information Architecture
→ Nielsen Heuristics
→ CRAP Principles
→ Brand Visual Style
→ Decorative Elements
```

---

## Version

```text
LINEA Pilates UI/UX Design Specification
Version 1.0
Purpose: UI/UX Design System / Claude AI Design Instruction
```
