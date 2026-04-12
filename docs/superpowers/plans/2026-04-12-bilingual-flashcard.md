# Bilingual Flashcard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为 120 张闪卡添加英文翻译（frontEn / backEn），并在 UI 上同时显示中英文，帮助销售人员练习双语产品介绍。

**Architecture:** 数据层在 `flashcards.js` 每条记录加 `frontEn` + `backEn` 字段；UI 层在卡片正反面各加一个英文段落元素，由 `renderFlashcard` 填充；CSS 加 `.fc-en-text` 样式规则和卡片高度调整。

**Tech Stack:** 原生 JS，无第三方依赖。

---

## File Map

| 文件 | 改动 |
|------|------|
| `flashcards.js` | 120 条记录各加 `frontEn` 和 `backEn` 英文字段 |
| `index.html` | 闪卡正面加 `fc-question-en`，背面加 `fc-answer-en` |
| `app.js` | `els` 加两个 DOM 引用；`renderFlashcard` 填充英文内容（含空值回退） |
| `style.css` | `.fc-en-text` 样式；`.fc-card-inner` min-height 调整 |

---

### Task A: index.html — 添加英文段落元素

**Files:**
- Modify: `index.html:100-107`

- [ ] **Step 1: 在闪卡正面加英文问题元素**

找到：
```html
          <div class="fc-face fc-front">
            <p id="fc-question" class="fc-question-text"></p>
            <p class="fc-flip-hint">点击卡片查看答案</p>
          </div>
```

改为：
```html
          <div class="fc-face fc-front">
            <p id="fc-question" class="fc-question-text"></p>
            <p id="fc-question-en" class="fc-en-text"></p>
            <p class="fc-flip-hint">点击卡片查看答案</p>
          </div>
```

- [ ] **Step 2: 在闪卡背面加英文答案元素**

找到：
```html
          <div class="fc-face fc-back">
            <p id="fc-answer" class="fc-answer-text"></p>
            <p id="fc-explanation" class="fc-explanation-text"></p>
          </div>
```

改为：
```html
          <div class="fc-face fc-back">
            <p id="fc-answer" class="fc-answer-text"></p>
            <p id="fc-answer-en" class="fc-en-text"></p>
            <p id="fc-explanation" class="fc-explanation-text"></p>
          </div>
```

- [ ] **Step 3: 验证**

打开 `index.html`，确认闪卡浏览页面正常渲染（英文内容暂时为空，不影响现有功能）。

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add English text elements to flashcard HTML"
```

---

### Task B: app.js — 填充英文内容

**Files:**
- Modify: `app.js:53-55`（els 对象）
- Modify: `app.js:93-106`（renderFlashcard 函数）

- [ ] **Step 1: 在 els 对象加两个 DOM 引用**

找到：
```js
  fcQuestion: document.getElementById('fc-question'),
  fcAnswer: document.getElementById('fc-answer'),
  fcExplanation: document.getElementById('fc-explanation'),
```

改为：
```js
  fcQuestion: document.getElementById('fc-question'),
  fcAnswer: document.getElementById('fc-answer'),
  fcAnswerEn: document.getElementById('fc-answer-en'),
  fcExplanation: document.getElementById('fc-explanation'),
  fcQuestionEn: document.getElementById('fc-question-en'),
```

- [ ] **Step 2: 在 renderFlashcard 中填充英文内容**

找到：
```js
  els.fcQuestion.textContent = q.front;
  els.fcAnswer.textContent = q.back;
  els.fcExplanation.textContent = '';
```

改为：
```js
  els.fcQuestion.textContent = q.front;
  els.fcQuestionEn.textContent = q.frontEn || '';
  els.fcAnswer.textContent = q.back;
  els.fcAnswerEn.textContent = q.backEn || '';
  els.fcExplanation.textContent = '';
```

- [ ] **Step 3: 验证**

打开浏览器控制台，确认 `document.getElementById('fc-question-en')` 和 `document.getElementById('fc-answer-en')` 返回 DOM 元素（非 null）。

- [ ] **Step 4: Commit**

```bash
git add app.js
git commit -m "feat: render English flashcard content with fallback"
```

---

### Task C: style.css — 英文样式和卡片高度调整

**Files:**
- Modify: `style.css:602-672`（闪卡样式区域）

- [ ] **Step 1: 添加 .fc-en-text 样式**

在 `.fc-explanation-text` 样式块之后、`.fc-nav` 之前插入：

找到：
```css
.fc-explanation-text {
  font-size: 14px;
  line-height: 1.6;
  color: var(--muted);
  margin: 0;
  text-align: left;
}

.fc-nav {
```

改为：
```css
.fc-explanation-text {
  font-size: 14px;
  line-height: 1.6;
  color: var(--muted);
  margin: 0;
  text-align: left;
}

.fc-en-text {
  font-size: 14px;
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  color: var(--muted);
  margin-top: 8px;
  line-height: 1.5;
  text-align: left;
}

.fc-nav {
```

- [ ] **Step 2: 调整卡片高度**

找到：
```css
.fc-card-inner {
  position: relative;
  width: 100%;
  min-height: 260px;
```

改为：
```css
.fc-card-inner {
  position: relative;
  width: 100%;
  min-height: 280px;
```

- [ ] **Step 3: 给内层面板加 overflow-y**

在 `.fc-back` 规则之后追加：

找到：
```css
.fc-back {
  transform: rotateY(180deg);
  background: var(--brand-soft);
}
```

改为：
```css
.fc-back {
  transform: rotateY(180deg);
  background: var(--brand-soft);
}

.fc-front,
.fc-back {
  overflow-y: auto;
}
```

注意：加在 `.fc-front` / `.fc-back` 上而非 `.fc-face`，避免干扰翻转动画。

- [ ] **Step 4: 验证**

打开 `index.html`，进入闪卡浏览，确认卡片高度足够、英文文本以小字灰色显示在中文下方、长内容卡片可滚动。

- [ ] **Step 5: Commit**

```bash
git add style.css
git commit -m "feat: add bilingual flashcard styles and increase card height"
```

---

### Task D: flashcards.js — 添加 120 条英文翻译

**Files:**
- Modify: `flashcards.js`（全文）

这是主要工作量。120 条闪卡各加 `frontEn` 和 `backEn` 字段。

- [ ] **Step 1: 翻译所有 120 条闪卡**

逐条为每张卡片添加英文翻译。翻译原则：
- **术语一致性**：产品名统一用 `Quick-Assembly Container`、`Z-Fold Container`、`X-Fold Container`、`Expandable Container`、`Space Capsule`
- **简洁直白**：英文答案以简洁陈述句为主，避免复杂从句
- **数字保持原文**：尺寸、重量、价格等数字直接保留
- **分类名不翻译**：`category` 字段保持中文

示例：

```js
{ id: 1, category: '通用类', front: '中辉绿建服务覆盖多少个国家和地区？', frontEn: 'How many countries and regions does Zhonghui Green Building serve?', back: '超过160个国家和地区。', backEn: 'Over 160 countries and regions.' },
```

- [ ] **Step 2: 验证**

打开浏览器，进入闪卡浏览模式：
1. 确认 120 张卡片都有英文显示
2. 翻转卡片后中文答案下方有英文翻译
3. 卡片高度无溢出（长答案卡片也能正常显示）
4. TTS 朗读仍只读中文

- [ ] **Step 3: Commit**

```bash
git add flashcards.js
git commit -m "feat: add English translations for all 120 flashcards"
```

---

## 完成后推送

```bash
git push
```
