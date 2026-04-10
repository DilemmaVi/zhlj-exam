# 错题本与数据看板 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add persistent wrong-question tracking, a dedicated wrongbook practice mode, and a category/question-level stats dashboard to the existing static quiz app.

**Architecture:** New `storage.js` owns all localStorage reads/writes and exposes a clean API. `app.js` calls `Storage.recordAnswer()` on every answer submission, adds `mode: 'wrongbook'` to the existing state machine, and renders the stats view dynamically. All new views reuse existing CSS tokens and card patterns. No frameworks, no build tools.

**Tech Stack:** Vanilla JS (ES6), CSS3, localStorage, browser console assertions (no test runner)

---

## File Structure

| File | Change |
|------|--------|
| `storage.js` | **Create** — localStorage data layer, zero DOM dependencies |
| `index.html` | **Modify** — 2 new home buttons, `wb-mastery-hint` div in quiz card, `view-stats` section |
| `style.css` | **Modify** — mastery hint, stats card, accuracy bar, question row styles |
| `app.js` | **Modify** — wire storage, wrongbook mode, stats view rendering |
| `questions.js` | No change |

---

## Common Verification Setup

```bash
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173/` and paste into console before each verification block:

```js
function assert(condition, message) {
  if (condition) console.log(`PASS: ${message}`);
  else console.error(`FAIL: ${message}`);
}
```

---

## Task 1: Create storage.js

**Files:**
- Create: `storage.js`

- [ ] **Step 1: Write the data contract**

```txt
localStorage key: zhlj_quiz_records
value shape: { "1": { wrong, correct, consecutiveCorrect }, ... }
mastered = consecutiveCorrect >= 2
wrong-book eligible = wrong > 0 && consecutiveCorrect < 2
```

- [ ] **Step 2: Create storage.js**

```js
'use strict';

const STORAGE_KEY = 'zhlj_quiz_records';

const Storage = {
  _load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch {
      return {};
    }
  },

  _save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  getRecord(id) {
    const data = this._load();
    return data[String(id)] || { wrong: 0, correct: 0, consecutiveCorrect: 0 };
  },

  recordAnswer(id, isCorrect) {
    try {
      const data = this._load();
      const key = String(id);
      const rec = data[key] || { wrong: 0, correct: 0, consecutiveCorrect: 0 };
      if (isCorrect) {
        rec.correct += 1;
        rec.consecutiveCorrect += 1;
      } else {
        rec.wrong += 1;
        rec.consecutiveCorrect = 0;
      }
      data[key] = rec;
      this._save(data);
    } catch (e) {
      console.warn('Storage.recordAnswer failed:', e);
    }
  },

  getWrongIds() {
    const data = this._load();
    return Object.entries(data)
      .filter(([, rec]) => rec.wrong > 0 && rec.consecutiveCorrect < 2)
      .map(([id]) => Number(id));
  },

  getWrongCount() {
    return this.getWrongIds().length;
  },

  getCategoryStats() {
    const data = this._load();
    const stats = {};
    for (const q of questions) {
      const cat = q.category;
      if (!stats[cat]) stats[cat] = { total: 0, correct: 0, wrong: 0 };
      const rec = data[String(q.id)];
      if (rec) {
        stats[cat].correct += rec.correct;
        stats[cat].wrong += rec.wrong;
        stats[cat].total += rec.correct + rec.wrong;
      }
    }
    return stats;
  },

  getQuestionStats(category) {
    const data = this._load();
    return questions
      .filter((q) => q.category === category)
      .map((q) => ({
        question: q,
        record: data[String(q.id)] || { wrong: 0, correct: 0, consecutiveCorrect: 0 }
      }));
  },

  clear() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Storage.clear failed:', e);
    }
  }
};
```

- [ ] **Step 3: Verify storage API in browser console**

```js
Storage.recordAnswer(1, false);
Storage.recordAnswer(1, true);
const rec = Storage.getRecord(1);
assert(rec.wrong === 1, 'wrong count incremented');
assert(rec.correct === 1, 'correct count incremented');
assert(rec.consecutiveCorrect === 1, 'consecutiveCorrect is 1');

Storage.recordAnswer(1, false);
assert(Storage.getRecord(1).consecutiveCorrect === 0, 'consecutiveCorrect resets on wrong');

Storage.recordAnswer(2, false);
assert(Storage.getWrongIds().includes(1), 'q1 in wrong list');
assert(Storage.getWrongIds().includes(2), 'q2 in wrong list');

Storage.recordAnswer(1, true);
Storage.recordAnswer(1, true);
assert(!Storage.getWrongIds().includes(1), 'q1 graduated after 2 consecutive correct');

Storage.clear();
assert(Storage.getWrongIds().length === 0, 'clear wipes all records');
```

Expected: seven `PASS` lines.

- [ ] **Step 4: Commit**

```bash
git add storage.js
git commit -m "feat: add localStorage storage layer for quiz records"
```

---

## Task 2: Update index.html

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add storage.js script tag and two new home buttons**

In `index.html`, add `<script src="storage.js"></script>` between `questions.js` and `app.js`:

```html
  <script src="questions.js"></script>
  <script src="storage.js"></script>
  <script src="app.js"></script>
```

In the `home-actions` div, add two buttons after the existing ones:

```html
        <div class="home-actions">
          <button id="btn-practice" class="btn btn-primary">练习模式</button>
          <button id="btn-exam" class="btn btn-secondary">考试模式</button>
          <button id="btn-wrongbook" class="btn btn-secondary" disabled>错题本（0题）</button>
          <button id="btn-stats" class="btn btn-secondary">数据看板</button>
        </div>
```

- [ ] **Step 2: Add wb-mastery-hint inside the quiz card**

In `view-quiz`'s `.quiz-card`, add the mastery hint div after `feedback-box`:

```html
        <div id="feedback-box" class="feedback-box hidden"></div>
        <div id="wb-mastery-hint" class="mastery-hint hidden"></div>
        <div class="quiz-actions">
```

- [ ] **Step 3: Add view-stats section**

Add before the closing `</main>` tag:

```html
    <section id="view-stats" class="view">
      <div class="stats-card">
        <div class="stats-header">
          <h2>数据看板</h2>
          <button id="btn-stats-home" class="btn btn-secondary">返回首页</button>
        </div>
        <div id="stats-categories" class="stats-categories"></div>
      </div>
    </section>
```

- [ ] **Step 4: Verify DOM**

```js
assert(document.getElementById('btn-wrongbook'), 'wrongbook button exists');
assert(document.getElementById('btn-stats'), 'stats button exists');
assert(document.getElementById('wb-mastery-hint'), 'mastery hint exists');
assert(document.getElementById('view-stats'), 'stats view exists');
assert(document.getElementById('stats-categories'), 'stats categories container exists');
```

Expected: five `PASS` lines.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add wrongbook and stats buttons and views to html shell"
```

---

## Task 3: Add CSS for new components

**Files:**
- Modify: `style.css`

- [ ] **Step 1: Append new styles at the end of style.css**

```css
/* Mastery hint inside feedback */
.mastery-hint {
  margin-top: 8px;
  padding: 8px 14px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  background: rgba(76, 175, 80, 0.12);
  color: var(--brand-dark);
}

/* Stats view */
.stats-card {
  background: transparent;
}

.stats-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.stats-header h2 {
  font-size: 22px;
}

.stats-header .btn {
  width: auto;
  padding: 8px 16px;
  min-height: 40px;
  font-size: 14px;
}

.stats-categories {
  display: grid;
  gap: 12px;
}

.stat-cat-card {
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 16px 18px;
  cursor: pointer;
}

.stat-cat-card:hover {
  box-shadow: 0 20px 44px rgba(31, 54, 34, 0.12);
}

.stat-cat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.stat-cat-name {
  font-size: 16px;
  font-weight: 700;
}

.stat-cat-meta {
  font-size: 13px;
  color: var(--muted);
}

.stat-acc-bar-track {
  height: 8px;
  border-radius: 999px;
  background: #e6ece6;
  overflow: hidden;
  margin-bottom: 6px;
}

.stat-acc-bar-fill {
  height: 100%;
  border-radius: inherit;
  transition: width 0.3s ease;
}

.stat-acc-bar-fill.high  { background: var(--brand); }
.stat-acc-bar-fill.mid   { background: #f57c00; }
.stat-acc-bar-fill.low   { background: var(--danger); }

.stat-acc-label {
  font-size: 13px;
  color: var(--muted);
}

.stat-wrong-badge {
  font-size: 12px;
  color: var(--danger);
  margin-top: 4px;
}

/* Question detail rows */
.stat-q-list {
  margin-top: 12px;
  border-top: 1px solid var(--line);
  padding-top: 10px;
  display: grid;
  gap: 8px;
}

.stat-q-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.stat-q-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--text);
}

.stat-q-counts {
  color: var(--muted);
  white-space: nowrap;
}

.stat-q-tag {
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
}

.stat-q-tag.mastered  { background: rgba(76,175,80,0.12); color: var(--brand-dark); }
.stat-q-tag.wrong     { background: rgba(216,67,21,0.1);  color: var(--danger); }
.stat-q-tag.untouched { background: #f0f0f0; color: var(--muted); }

.stat-collapse-btn {
  margin-top: 10px;
  font-size: 13px;
  color: var(--brand-dark);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-weight: 700;
}
```

- [ ] **Step 2: Commit**

```bash
git add style.css
git commit -m "feat: add styles for wrongbook mastery hint and stats dashboard"
```

---

## Task 4: Wire storage into existing answer flow

**Files:**
- Modify: `app.js`

- [ ] **Step 1: Add new DOM references to els**

In the `els` object, add after `homeButton`:

```js
  wrongbook: document.getElementById('btn-wrongbook'),
  stats: document.getElementById('btn-stats'),
  wbMasteryHint: document.getElementById('wb-mastery-hint'),
  statsHome: document.getElementById('btn-stats-home'),
  statsCategories: document.getElementById('stats-categories')
```

- [ ] **Step 2: Update showView to handle stats**

```js
function showView(name) {
  els.home.classList.remove('active');
  els.quiz.classList.remove('active');
  els.results.classList.remove('active');
  els.stats.classList.remove('active');
  els[name].classList.add('active');
}
```

Wait — `els.stats` is the button, not the view. Fix: add `statsView` to els:

```js
  statsView: document.getElementById('view-stats'),
```

And update `showView`:

```js
function showView(name) {
  [els.home, els.quiz, els.results, els.statsView].forEach((v) => v.classList.remove('active'));
  const target = name === 'stats' ? els.statsView : els[name];
  target.classList.add('active');
}
```

- [ ] **Step 3: Call Storage.recordAnswer in submitAnswer**

In `submitAnswer()`, after `state.answered = true;`, add:

```js
  Storage.recordAnswer(question.id, correct);
```

- [ ] **Step 4: Add updateWrongbookButton helper and call it on home view**

```js
function updateWrongbookButton() {
  const count = Storage.getWrongCount();
  els.wrongbook.textContent = `错题本（${count}题）`;
  els.wrongbook.disabled = count === 0;
}
```

Call `updateWrongbookButton()` at the bottom of `renderResults()` (before `showView('results')`), and also wire it to the home button click so it refreshes when returning home:

```js
els.homeButton.addEventListener('click', () => {
  updateWrongbookButton();
  showView('home');
});
```

Also call `updateWrongbookButton()` once at page load — add at the bottom of app.js:

```js
updateWrongbookButton();
```

- [ ] **Step 5: Verify storage integration**

```js
startPractice();
const before = Storage.getRecord(state.activeQuestions[0].id);
submitAnswer([99]); // force wrong
const after = Storage.getRecord(state.activeQuestions[0].id);
assert(after.wrong === before.wrong + 1, 'wrong count incremented after wrong answer');
Storage.clear();
```

Expected: one `PASS` line.

- [ ] **Step 6: Commit**

```bash
git add app.js
git commit -m "feat: wire storage into answer flow and wrongbook button"
```

---

## Task 5: Implement wrongbook mode

**Files:**
- Modify: `app.js`

- [ ] **Step 1: Add masteredThisSession to state and startWrongBook**

Add `masteredThisSession: 0` to the `state` object.

Add `startWrongBook()`:

```js
function startWrongBook() {
  const wrongIds = new Set(Storage.getWrongIds());
  const wrongQuestions = shuffle(questions.filter((q) => wrongIds.has(q.id)));
  resetSession('wrongbook', wrongQuestions);
  state.masteredThisSession = 0;
  showView('quiz');
  renderCurrentQuestion();
}
```

- [ ] **Step 2: Hide mastery hint on each new question**

In `renderCurrentQuestion()`, after `clearFeedback()`, add:

```js
  els.wbMasteryHint.className = 'mastery-hint hidden';
  els.wbMasteryHint.textContent = '';
```

- [ ] **Step 3: Add wrongbook feedback handler**

```js
function revealWrongBookFeedback(userAnswer, question, correct) {
  markOptions(userAnswer, question.answer);
  const rec = Storage.getRecord(question.id);
  const mastered = rec.consecutiveCorrect >= 2;

  els.feedback.className = `feedback-box ${correct ? 'correct' : 'wrong'}`;
  const correctText = question.answer.map((i) => question.options[i]).join('、');
  els.feedback.textContent = `${correct ? '回答正确' : '回答错误'}。正确答案：${correctText}。${question.explanation}`;

  if (mastered) {
    state.masteredThisSession += 1;
    els.wbMasteryHint.textContent = '已掌握，移出错题本';
    els.wbMasteryHint.className = 'mastery-hint';
  } else if (correct) {
    els.wbMasteryHint.textContent = `连续答对 ${rec.consecutiveCorrect} / 2 次`;
    els.wbMasteryHint.className = 'mastery-hint';
  }

  const remaining = state.activeQuestions.length - (mastered ? 1 : 0);
  els.next.textContent = remaining <= 1 ? '查看结果' : '下一题';
  els.next.classList.remove('hidden');
}
```

- [ ] **Step 4: Handle wrongbook in submitAnswer**

In `submitAnswer()`, add the wrongbook branch:

```js
  if (state.mode === 'practice') {
    revealPracticeFeedback(userAnswer, question, correct);
  } else if (state.mode === 'wrongbook') {
    revealWrongBookFeedback(userAnswer, question, correct);
  } else {
    advanceExamFlow();
  }
```

- [ ] **Step 5: Handle wrongbook next-button logic**

In the `els.next` click listener, add wrongbook handling:

```js
els.next.addEventListener('click', () => {
  if (state.mode === 'wrongbook') {
    const rec = Storage.getRecord(state.activeQuestions[state.currentIndex].id);
    if (rec.consecutiveCorrect >= 2) {
      state.activeQuestions.splice(state.currentIndex, 1);
      if (state.activeQuestions.length === 0) {
        renderWrongBookResults();
        return;
      }
      if (state.currentIndex >= state.activeQuestions.length) {
        state.currentIndex = state.activeQuestions.length - 1;
      }
      renderCurrentQuestion();
      return;
    }
  }
  if (state.currentIndex === state.activeQuestions.length - 1) {
    renderResults();
    return;
  }
  state.currentIndex += 1;
  renderCurrentQuestion();
});
```

- [ ] **Step 6: Add renderWrongBookResults**

```js
function renderWrongBookResults() {
  const remaining = Storage.getWrongCount();
  els.resultTitle.textContent = '本轮练习完成';
  els.resultScore.textContent = `移出 ${state.masteredThisSession} 题`;
  els.resultStatus.textContent = remaining > 0 ? `还剩 ${remaining} 题未掌握` : '错题本已清空！';
  els.resultStatus.className = remaining > 0 ? 'result-status' : 'result-status pass';
  els.resultAccuracy.classList.add('hidden');
  els.retry.textContent = '继续练习';
  els.retry.classList.remove('hidden');
  els.wrongList.replaceChildren();
  updateWrongbookButton();
  showView('results');
}
```

Update `els.retry` listener to handle wrongbook re-entry:

```js
els.retry.addEventListener('click', () => {
  if (state.mode === 'wrongbook') {
    startWrongBook();
  } else {
    startPractice();
  }
});
```

- [ ] **Step 7: Wire wrongbook button**

```js
els.wrongbook.addEventListener('click', startWrongBook);
```

- [ ] **Step 8: Verify wrongbook flow**

```js
// Seed a wrong answer first
Storage.recordAnswer(questions[0].id, false);
updateWrongbookButton();
assert(!els.wrongbook.disabled, 'wrongbook button enabled after wrong answer');

startWrongBook();
assert(state.mode === 'wrongbook', 'mode is wrongbook');
assert(state.activeQuestions.length >= 1, 'wrongbook has questions');
assert(els.quiz.classList.contains('active'), 'quiz view active');
Storage.clear();
updateWrongbookButton();
assert(els.wrongbook.disabled, 'wrongbook button disabled after clear');
```

Expected: four `PASS` lines.

- [ ] **Step 9: Commit**

```bash
git add app.js
git commit -m "feat: implement wrongbook practice mode with mastery tracking"
```

---

## Task 6: Implement stats view

**Files:**
- Modify: `app.js`

- [ ] **Step 1: Add renderStats function**

```js
function renderStats() {
  const catStats = Storage.getCategoryStats();
  const wrongIds = new Set(Storage.getWrongIds());
  const categories = [...new Set(questions.map((q) => q.category))];

  els.statsCategories.innerHTML = '';

  categories.forEach((cat) => {
    const s = catStats[cat] || { total: 0, correct: 0, wrong: 0 };
    const acc = s.total === 0 ? null : Math.round((s.correct / s.total) * 100);
    const wrongInCat = questions.filter((q) => q.category === cat && wrongIds.has(q.id)).length;

    const card = document.createElement('div');
    card.className = 'stat-cat-card';

    const header = document.createElement('div');
    header.className = 'stat-cat-header';

    const name = document.createElement('span');
    name.className = 'stat-cat-name';
    name.textContent = cat;

    const meta = document.createElement('span');
    meta.className = 'stat-cat-meta';
    meta.textContent = s.total === 0 ? '尚未作答' : `已答 ${s.total} 次`;

    header.append(name, meta);
    card.appendChild(header);

    if (acc !== null) {
      const barTrack = document.createElement('div');
      barTrack.className = 'stat-acc-bar-track';
      const barFill = document.createElement('div');
      const level = acc >= 80 ? 'high' : acc >= 60 ? 'mid' : 'low';
      barFill.className = `stat-acc-bar-fill ${level}`;
      barFill.style.width = `${acc}%`;
      barTrack.appendChild(barFill);

      const label = document.createElement('div');
      label.className = 'stat-acc-label';
      label.textContent = `正确率 ${acc}%`;

      card.append(barTrack, label);
    }

    if (wrongInCat > 0) {
      const badge = document.createElement('div');
      badge.className = 'stat-wrong-badge';
      badge.textContent = `错题本 ${wrongInCat} 题`;
      card.appendChild(badge);
    }

    card.addEventListener('click', () => toggleCategoryDetail(card, cat));
    els.statsCategories.appendChild(card);
  });

  showView('stats');
}
```

- [ ] **Step 2: Add toggleCategoryDetail function**

```js
function toggleCategoryDetail(card, category) {
  const existing = card.querySelector('.stat-q-list');
  if (existing) {
    existing.remove();
    card.querySelector('.stat-collapse-btn').remove();
    return;
  }

  const qStats = Storage.getQuestionStats(category);
  const list = document.createElement('div');
  list.className = 'stat-q-list';

  qStats.forEach(({ question, record }) => {
    const row = document.createElement('div');
    row.className = 'stat-q-row';

    const text = document.createElement('span');
    text.className = 'stat-q-text';
    text.textContent = question.question.slice(0, 30) + (question.question.length > 30 ? '…' : '');

    const counts = document.createElement('span');
    counts.className = 'stat-q-counts';
    counts.textContent = record.total === 0 ? '—' : `✓${record.correct} ✗${record.wrong}`;

    const tag = document.createElement('span');
    tag.className = 'stat-q-tag';
    if (record.wrong === 0 && record.correct === 0) {
      tag.textContent = '未作答';
      tag.classList.add('untouched');
    } else if (record.consecutiveCorrect >= 2) {
      tag.textContent = '已掌握';
      tag.classList.add('mastered');
    } else if (record.wrong > 0 && record.consecutiveCorrect < 2) {
      tag.textContent = '错题本';
      tag.classList.add('wrong');
    } else {
      tag.textContent = '已作答';
      tag.classList.add('untouched');
    }

    row.append(text, counts, tag);
    list.appendChild(row);
  });

  const collapseBtn = document.createElement('button');
  collapseBtn.className = 'stat-collapse-btn';
  collapseBtn.textContent = '收起';
  collapseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    list.remove();
    collapseBtn.remove();
  });

  card.append(list, collapseBtn);
}
```

- [ ] **Step 3: Fix counts reference in getQuestionStats**

In `toggleCategoryDetail`, `record.total` is not defined in the storage schema. Replace `record.total === 0` with `record.correct === 0 && record.wrong === 0`:

```js
    counts.textContent = (record.correct === 0 && record.wrong === 0)
      ? '—'
      : `✓${record.correct} ✗${record.wrong}`;
```

- [ ] **Step 4: Wire stats button and home button**

```js
els.stats.addEventListener('click', renderStats);
els.statsHome.addEventListener('click', () => {
  updateWrongbookButton();
  showView('home');
});
```

- [ ] **Step 5: Verify stats view**

```js
Storage.recordAnswer(questions[0].id, false);
Storage.recordAnswer(questions[0].id, true);
renderStats();
assert(els.statsView.classList.contains('active'), 'stats view is active');
assert(els.statsCategories.children.length === 5, 'five category cards rendered');
Storage.clear();
```

Expected: two `PASS` lines.

- [ ] **Step 6: Commit**

```bash
git add app.js
git commit -m "feat: implement stats dashboard with category and question detail"
```

---

## Task 7: End-to-end smoke test

- [ ] **Step 1: Practice mode — verify storage records**

```
1. Click 练习模式
2. Answer 3 questions (mix of correct and wrong)
3. Return home — confirm 错题本 button shows correct count and is enabled
```

- [ ] **Step 2: Wrongbook mode — verify mastery flow**

```
1. Click 错题本
2. Answer a wrong question correctly twice
3. Confirm mastery hint shows "连续答对 1/2" then "已掌握，移出错题本"
4. Complete session — confirm result shows "移出 X 题"
5. Return home — confirm 错题本 count decreased
```

- [ ] **Step 3: Stats view — verify category and detail**

```
1. Click 数据看板
2. Confirm category cards show correct rates
3. Click a category card — confirm question rows expand
4. Click 收起 — confirm rows collapse
5. Click 返回首页
```

- [ ] **Step 4: Exam mode — verify storage records**

```
1. Click 考试模式
2. Complete a few questions
3. Submit — confirm 错题本 button updates on results page
```

- [ ] **Step 5: Final push**

```bash
git push
```
```
