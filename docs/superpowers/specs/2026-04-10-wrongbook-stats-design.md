# 错题本与数据看板 — 设计文档

**日期：** 2026-04-10
**依赖：** 现有静态答题系统（index.html / style.css / questions.js / app.js）

---

## 概述

在现有答题系统基础上，新增两个学习辅助功能：

1. **错题本模式** — 专项练习历史答错的题目，连续答对 2 次视为掌握，自动移出错题本
2. **数据看板** — 展示各分类正确率与题目级别答题记录，帮助定位薄弱点

所有数据通过 `localStorage` 持久化（key: `zhlj_quiz_records`），跨会话保留，清除浏览器缓存后重置。

---

## 文件结构

```
/
├── index.html       # 新增两个视图 + 两个首页按钮
├── style.css        # 新增看板卡片、进度条、题目列表样式
├── questions.js     # 不变
├── storage.js       # 新增：localStorage 数据层（纯数据，无 DOM）
└── app.js           # 扩展：接入 storage.js，新增错题本和看板的渲染与路由逻辑
```

---

## 数据层（storage.js）

### localStorage 结构

Key: `zhlj_quiz_records`

Value（JSON 对象，题目 id 为键）：

```js
{
  "1": { wrong: 2, correct: 1, consecutiveCorrect: 0 },
  "5": { wrong: 1, correct: 4, consecutiveCorrect: 2 }
}
```

字段说明：
- `wrong` — 历史总答错次数
- `correct` — 历史总答对次数
- `consecutiveCorrect` — 当前连续答对次数；答对 +1，答错归零；达到 2 视为「已掌握」。该字段跨会话持久化，不在会话开始时重置。例如上次练习结束时某题 `consecutiveCorrect: 1`，下次进入错题本时该题仍处于「连续答对 1 次」状态。

### 对外 API

```js
const Storage = {
  recordAnswer(id, isCorrect),  // 记录一次答题，更新 wrong/correct/consecutiveCorrect
  getRecord(id),                // 返回单题记录，不存在则返回 { wrong:0, correct:0, consecutiveCorrect:0 }
  getWrongIds(),                // 返回 wrong > 0 且 consecutiveCorrect < 2 的题目 id 数组
  getCategoryStats(),           // 返回 { 通用类: { total, correct, wrong }, ... }
                                // total = correct + wrong（已答题次数，非该分类题目总数）
  getQuestionStats(category),   // 返回该分类下所有题目的记录数组 [{ question, record }, ...]
  clear()                       // 清空所有记录
};
```

---

## 功能模块

### 首页变化

新增两个按钮，排在「练习模式」「考试模式」下方：

```
[ 练习模式        ]
[ 考试模式        ]
[ 错题本（12题）  ]   ← 括号内显示当前未掌握错题数；为 0 时置灰不可点
[ 数据看板        ]
```

### 错题本模式（view-wrongbook）

- 复用 view-quiz 的 HTML 结构和样式，题目来源换为 `Storage.getWrongIds()` 对应的题目列表
- 每次进入错题本时重新从 storage 拉取最新错题列表，顺序随机打乱
- 如果错题本为空（全部掌握），进入后直接显示「错题本已清空，继续加油！」并提供「返回首页」
- 答题流程与练习模式一致（立即显示对错 + 解析），额外在 feedback 中显示掌握进度：
  - 「连续答对 1 / 2 次」
  - 「已掌握，移出错题本 🎉」（此时该题从当次剩余列表中移除）
- 答完全部剩余题目后显示总结：「本轮练习完成，移出 X 题，还剩 Y 题未掌握」+ 「继续练习」「返回首页」。其中 Y 为本轮结束后调用 `Storage.getWrongIds().length` 的结果（全局剩余未掌握数），不是本轮未掌握的题数。

### 数据看板（view-stats）

**分类总览（默认视图）：**

每个分类一张卡片，包含：
- 分类名称
- 答题总数（correct + wrong）
- 正确率百分比 + 进度条
  - ≥ 80%：绿色（--brand）
  - 60–79%：橙色（#f57c00）
  - < 60%：红色（--danger）
  - 未答过题时进度条隐藏，仅显示「尚未作答」文字
- 错题本中剩余未掌握题数（灰色小标）

点击分类卡片展开题目明细。

**题目明细（展开层）：**

展示该分类下所有题目列表，每行：
- 题目文本（最多显示 30 字，超出省略号）
- 答对/答错次数，格式：「✓3  ✗1」
- 状态标签：「已掌握」（绿）/ 「错题本」（红）/ 「未作答」（灰）

提供「收起」按钮返回分类总览。看板顶部提供「返回首页」按钮。

### 与现有模式的联动

- 练习模式和考试模式答题时，每次 `submitAnswer()` 后调用 `Storage.recordAnswer(id, isCorrect)`
- 答题结果不因 storage 写入失败而中断（try/catch 保护，写入失败时 `console.warn` 输出错误信息，不向用户展示）

---

## UI 风格

沿用现有设计语言（CSS 变量、卡片 + 阴影、圆角、480px 最大宽度）。

新增样式：
- 正确率进度条（细条，颜色动态根据正确率设定）
- 题目列表行（轻分隔线，状态标签小圆角 pill）
- 掌握进度提示（feedback-box 内附加一行小字）

---

## 明确不在范围内

- 不支持多用户/账号区分（localStorage 按浏览器存储）
- 不支持数据导出或云同步
- 不支持在错题本中修改答案记录
- 不支持手动将题目加入/移出错题本
