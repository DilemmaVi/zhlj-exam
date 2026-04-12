# Bilingual Flashcard Design

## Goal

闪卡内容做成中英文对照形式，帮助销售人员同时记忆中文知识和英文表达，以便用英文向外国客户介绍产品。

## Scope

仅修改闪卡（`flashcards.js`），不影响练习题库（`questions.js`）或学习手册。

## Data Model

`flashcards.js` 每条记录新增两个字段：

```js
// 之前
{ id: 1, category: '通用类', front: '中辉绿建服务覆盖多少个国家和地区？', back: '超过160个国家和地区。' }

// 之后
{ id: 1, category: '通用类', front: '中辉绿建服务覆盖多少个国家和地区？', frontEn: 'How many countries and regions does Zhonghui Green Building serve?', back: '超过160个国家和地区。', backEn: 'Over 160 countries and regions.' }
```

- `frontEn`：英文问题，与 `front` 中文问题一一对应
- `backEn`：英文答案，与 `back` 中文答案一一对应
- `category` 保持中文不变（分类标签仅中文，不翻译）
- 120 条闪卡全部翻译
- 回退处理：`renderFlashcard` 中若 `frontEn` 或 `backEn` 为空/缺失，对应元素设为空文本（不显示、不占位），保证不出现空白间隙

## UI

### 闪卡正面（未翻转）

```
┌─────────────────────────────────────┐
│                                     │
│   中辉绿建服务覆盖多少个国家和地区？      │  ← 中文，大字
│   How many countries and regions    │  ← 英文，小字、灰色
│   does Zhonghui Green Building serve?│
│                                     │
│          点击卡片查看答案              │
└─────────────────────────────────────┘
```

### 闪卡背面（翻转后）

```
┌─────────────────────────────────────┐
│                                     │
│   超过160个国家和地区。                │  ← 中文答案，大字
│   Over 160 countries and regions.   │  ← 英文答案，小字、灰色
│                                     │
└─────────────────────────────────────┘
```

### HTML 改动

- 闪卡正面 `fc-front` 内新增 `<p id="fc-question-en" class="fc-en-text"></p>`，位于中文问题之后、翻转提示之前
- 闪卡背面 `fc-back` 内新增 `<p id="fc-answer-en" class="fc-en-text"></p>`，位于中文答案之后

### CSS 样式

```css
.fc-en-text {
  font-size: 14px;
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  color: var(--muted);
  margin-top: 8px;
  line-height: 1.5;
}
```

### 卡片高度

`.fc-card-inner` 的 `min-height: 260px` 可能不够容纳中英双语内容（尤其是答案较长的卡片）。将 `.fc-card-inner` 改为 `min-height: 280px`，并在 `.fc-front` / `.fc-back`（内层面板，非翻转外壳）加 `overflow-y: auto`，让内容自动撑开或滚动。注意不要在 `.fc-face` 本身加 `overflow-y`，否则会干扰翻转动画。

## TTS

TTS **仅读中文**，不读英文。`getFcSpeakText()` 保持不变。

## File Changes

| 文件 | 改动 |
|------|------|
| `flashcards.js` | 120 条记录各加 `frontEn` 和 `backEn` 英文字段 |
| `index.html` | 闪卡正面加 `fc-question-en`，背面加 `fc-answer-en` |
| `app.js` | `renderFlashcard` 填充 `els.fcQuestionEn` 和 `els.fcAnswerEn`；`els` 对象加两个 DOM 引用；空值回退处理 |
| `style.css` | `.fc-en-text` 样式规则（含西文字体栈）；`.fc-face` min-height 调整 |

## Out of Scope

- 练习题库（`questions.js`）不加英文
- 学习手册（`.md`）不加英文
- 无语言切换按钮（始终同时显示中英文）
- TTS 不朗读英文
