'use strict';

const state = {
  mode: 'practice',
  activeQuestions: [],
  currentIndex: 0,
  selectedOptions: [],
  answered: false,
  correctCount: 0,
  wrongItems: [],
  masteredThisSession: 0
};

const els = {
  home: document.getElementById('view-home'),
  quiz: document.getElementById('view-quiz'),
  results: document.getElementById('view-results'),
  practice: document.getElementById('btn-practice'),
  exam: document.getElementById('btn-exam'),
  progress: document.getElementById('progress-bar'),
  number: document.getElementById('question-number'),
  category: document.getElementById('question-category'),
  question: document.getElementById('question-text'),
  options: document.getElementById('options-container'),
  feedback: document.getElementById('feedback-box'),
  confirm: document.getElementById('btn-confirm'),
  next: document.getElementById('btn-next'),
  submit: document.getElementById('btn-submit-exam'),
  resultTitle: document.getElementById('result-title'),
  resultScore: document.getElementById('result-score'),
  resultStatus: document.getElementById('result-status'),
  resultAccuracy: document.getElementById('result-accuracy'),
  wrongList: document.getElementById('wrong-list'),
  retry: document.getElementById('btn-retry'),
  homeButton: document.getElementById('btn-home'),
  wrongbook: document.getElementById('btn-wrongbook'),
  stats: document.getElementById('btn-stats'),
  statsView: document.getElementById('view-stats'),
  wbMasteryHint: document.getElementById('wb-mastery-hint'),
  statsHome: document.getElementById('btn-stats-home'),
  statsCategories: document.getElementById('stats-categories'),
  exit: document.getElementById('btn-exit'),
  resumePrompt: document.getElementById('resume-prompt'),
  resumeLabel: document.getElementById('resume-label'),
  btnResume: document.getElementById('btn-resume'),
  btnDiscard: document.getElementById('btn-discard'),
  flashcard: document.getElementById('btn-flashcard'),
  fcView: document.getElementById('view-flashcard'),
  fcProgress: document.getElementById('fc-progress-bar'),
  fcNumber: document.getElementById('fc-number'),
  fcCategory: document.getElementById('fc-category'),
  fcCard: document.getElementById('fc-card'),
  fcQuestion: document.getElementById('fc-question'),
  fcQuestionEn: document.getElementById('fc-question-en'),
  fcAnswer: document.getElementById('fc-answer'),
  fcAnswerEn: document.getElementById('fc-answer-en'),
  fcExplanation: document.getElementById('fc-explanation'),
  fcPrev: document.getElementById('btn-fc-prev'),
  fcNext: document.getElementById('btn-fc-next'),
  fcExit: document.getElementById('btn-fc-exit'),
  speak: document.getElementById('btn-speak'),
  fcSpeak: document.getElementById('btn-fc-speak'),
  review: document.getElementById('btn-review')
};

function showView(name) {
  stopSpeech();
  [els.home, els.quiz, els.results, els.statsView, els.fcView].forEach((v) => v.classList.remove('active'));
  const target = name === 'stats' ? els.statsView : name === 'flashcard' ? els.fcView : els[name];
  target.classList.add('active');
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function resetSession(mode, activeQuestions) {
  state.mode = mode;
  state.activeQuestions = activeQuestions;
  state.currentIndex = 0;
  state.selectedOptions = [];
  state.answered = false;
  state.correctCount = 0;
  state.wrongItems = [];
  state.masteredThisSession = 0;
}

let fcIndex = 0;

function renderFlashcard(index) {
  stopSpeech();
  const q = flashcards[index];
  const total = flashcards.length;
  els.fcNumber.textContent = `第 ${index + 1} 题 / 共 ${total} 题`;
  els.fcProgress.style.width = `${((index + 1) / total) * 100}%`;
  els.fcCategory.textContent = q.category;
  els.fcQuestion.textContent = q.front;
  els.fcQuestionEn.textContent = q.frontEn || '';
  els.fcAnswer.textContent = q.back;
  els.fcAnswerEn.textContent = q.backEn || '';
  els.fcExplanation.textContent = '';
  els.fcCard.classList.remove('flipped');
  els.fcPrev.disabled = index === 0;
  els.fcNext.textContent = index === total - 1 ? '完成' : '下一题';
}

function startFlashcard() {
  fcIndex = 0;
  showView('flashcard');
  renderFlashcard(0);
}

function speak(text) {
  if (!window.speechSynthesis || !text) return;
  stopSpeech();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'zh-CN';
  utter.onend = () => updateAllSpeakButtons(false);
  utter.onerror = () => updateAllSpeakButtons(false);
  window.speechSynthesis.speak(utter);
  updateAllSpeakButtons(true);
}

function stopSpeech() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

function updateAllSpeakButtons(speaking) {
  [els.speak, els.fcSpeak].forEach((btn) => {
    if (!btn) return;
    btn.textContent = speaking ? '⏹ 停止' : '🔈 朗读';
    btn.setAttribute('aria-label', speaking ? '停止朗读' : '朗读');
  });
}

function getQuizSpeakText() {
  const q = state.activeQuestions[state.currentIndex];
  if (!q) return '';
  if (state.mode === 'exam' || !state.answered) {
    const optionsText = q.options.join('。');
    return `${q.question}。${optionsText}`;
  }
  const answerText = q.answer.map((i) => q.options[i]).join('、');
  return `正确答案：${answerText}。${q.explanation}`;
}

function getFcSpeakText() {
  const q = flashcards[fcIndex];
  if (!q) return '';
  if (!els.fcCard.classList.contains('flipped')) {
    return q.front;
  }
  return q.back;
}

function updateWrongbookButton() {
  const count = Storage.getWrongCount();
  els.wrongbook.textContent = `错题本（${count}题）`;
  els.wrongbook.disabled = count === 0;
}

function updateReviewButton() {
  const count = Storage.getDueIds().length;
  if (count === 0) {
    els.review.textContent = '复习模式（已全部复习）';
    els.review.disabled = true;
  } else {
    els.review.textContent = `复习模式（${count}题）`;
    els.review.disabled = false;
  }
}

function buildSessionSnapshot() {
  return {
    mode: state.mode,
    questionIds: state.activeQuestions.map((q) => q.id),
    currentIndex: state.currentIndex,
    correctCount: state.correctCount,
    wrongItems: state.wrongItems,
    answered: state.answered
  };
}

function updateExitButtonVisibility() {
  const canExit = state.mode === 'practice' || state.mode === 'exam' || state.mode === 'wrongbook' || state.mode === 'review';
  const isLastAndAnswered = state.answered && state.currentIndex === state.activeQuestions.length - 1;
  els.exit.classList.toggle('hidden', !canExit || isLastAndAnswered);
}

let _pendingStart = null;

function hideResumeModal() {
  els.resumePrompt.classList.add('hidden');
  _pendingStart = null;
}

function tryStartWithResume(mode, startFn) {
  const saved = Storage.loadSession();
  if (saved && saved.mode === mode) {
    const modeLabel = mode === 'exam' ? '上次考试' : mode === 'wrongbook' ? '上次错题练习' : '上次练习';
    els.resumeLabel.textContent = `继续${modeLabel}？（已完成 ${saved.currentIndex} / ${saved.questionIds.length} 题）`;
    _pendingStart = startFn;
    els.resumePrompt.classList.remove('hidden');
    return;
  }
  startFn();
}

function resumeSession(saved) {
  const qMap = new Map(questions.map((q) => [q.id, q]));
  const activeQuestions = saved.questionIds.map((id) => qMap.get(id)).filter(Boolean);
  state.mode = saved.mode;
  state.activeQuestions = activeQuestions;
  state.currentIndex = saved.currentIndex;
  state.correctCount = saved.correctCount;
  state.wrongItems = saved.wrongItems;
  state.selectedOptions = [];
  state.answered = false;
  state.masteredThisSession = 0;
  hideResumeModal();
  showView('quiz');
  renderCurrentQuestion();
}

function pickExamQuestions() {
  const quotas = {
    '通用类': 20,
    '快拼箱': 8,
    '折叠箱': 5,
    '拓展箱': 12,
    '太空舱': 5
  };

  const picked = [];
  for (const [category, count] of Object.entries(quotas)) {
    const pool = shuffle(questions.filter((question) => question.category === category));
    picked.push(...pool.slice(0, count));
  }

  if (picked.length < 50) {
    const usedIds = new Set(picked.map((question) => question.id));
    const extras = shuffle(questions.filter((question) => !usedIds.has(question.id)));
    picked.push(...extras.slice(0, 50 - picked.length));
  }

  return shuffle(picked).slice(0, 50);
}

function startPractice() {
  Storage.clearSession();
  resetSession('practice', [...questions]);
  showView('quiz');
  renderCurrentQuestion();
}

function startExam() {
  Storage.clearSession();
  resetSession('exam', pickExamQuestions());
  showView('quiz');
  renderCurrentQuestion();
}

function startWrongBook() {
  Storage.clearSession();
  const wrongIds = new Set(Storage.getWrongIds());
  const wrongQuestions = shuffle(questions.filter((q) => wrongIds.has(q.id)));
  resetSession('wrongbook', wrongQuestions);
  state.masteredThisSession = 0;
  showView('quiz');
  renderCurrentQuestion();
}

function startReview() {
  const dueIds = Storage.getDueIds();
  if (dueIds.length === 0) return;
  const qMap = new Map(questions.map((q) => [q.id, q]));
  const dueQuestions = dueIds.map((id) => qMap.get(id)).filter(Boolean);
  resetSession('review', dueQuestions);
  showView('quiz');
  renderCurrentQuestion();
}

function clearFeedback() {
  els.feedback.className = 'feedback-box hidden';
  els.feedback.textContent = '';
}

function updateProgress() {
  const currentNumber = state.currentIndex + 1;
  const total = state.activeQuestions.length;
  els.number.textContent = `第 ${currentNumber} 题 / 共 ${total} 题`;
  els.progress.style.width = `${(currentNumber / total) * 100}%`;
}

function renderCurrentQuestion() {
  stopSpeech();
  const current = state.activeQuestions[state.currentIndex];
  state.selectedOptions = [];
  state.answered = false;

  updateProgress();
  els.category.textContent = current.category;
  els.question.textContent = current.question;
  els.options.innerHTML = '';
  clearFeedback();
  els.wbMasteryHint.className = 'mastery-hint hidden';
  els.wbMasteryHint.textContent = '';
  updateExitButtonVisibility();
  els.next.classList.add('hidden');
  els.submit.classList.add('hidden');
  els.confirm.classList.add('hidden');

  if (current.type === 'multiple') {
    renderMultipleOptions(current);
  } else {
    renderSingleOptions(current);
  }
}

function renderSingleOptions(question) {
  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'option-button';
    button.textContent = option;
    button.addEventListener('click', () => submitAnswer([index]));
    els.options.appendChild(button);
  });
}

function renderMultipleOptions(question) {
  question.options.forEach((option, index) => {
    const label = document.createElement('label');
    label.className = 'option-check';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.value = String(index);
    input.addEventListener('change', (event) => {
      if (event.target.checked) {
        if (!state.selectedOptions.includes(index)) {
          state.selectedOptions.push(index);
        }
      } else {
        state.selectedOptions = state.selectedOptions.filter((item) => item !== index);
      }
      label.classList.toggle('selected', event.target.checked);
    });

    const text = document.createElement('span');
    text.textContent = option;

    label.appendChild(input);
    label.appendChild(text);
    els.options.appendChild(label);
  });

  els.confirm.classList.remove('hidden');
  els.confirm.onclick = () => submitAnswer([...state.selectedOptions]);
}

function normalizeAnswer(answer) {
  return [...answer].sort((a, b) => a - b);
}

function isCorrectAnswer(userAnswer, question) {
  return JSON.stringify(normalizeAnswer(userAnswer)) === JSON.stringify(normalizeAnswer(question.answer));
}

function markOptions(userAnswer, correctAnswer) {
  const selected = new Set(userAnswer);
  const correct = new Set(correctAnswer);
  [...els.options.children].forEach((node, index) => {
    node.classList.remove('selected');
    if (correct.has(index)) {
      node.classList.add('correct');
    }
    if (selected.has(index) && !correct.has(index)) {
      node.classList.add('wrong');
    }
    const input = node.querySelector('input');
    if (input) {
      input.disabled = true;
    }
    if (node.tagName === 'BUTTON') {
      node.disabled = true;
    }
  });
}

function pushWrongItem(question) {
  state.wrongItems.push({
    question: question.question,
    category: question.category,
    correctAnswer: question.answer.map((index) => question.options[index]),
    explanation: question.explanation
  });
}

function revealPracticeFeedback(userAnswer, question, correct) {
  markOptions(userAnswer, question.answer);
  els.feedback.className = `feedback-box ${correct ? 'correct' : 'wrong'}`;
  const correctText = question.answer.map((index) => question.options[index]).join('、');
  els.feedback.textContent = `${correct ? '回答正确' : '回答错误'}。正确答案：${correctText}。${question.explanation}`;

  if (state.currentIndex === state.activeQuestions.length - 1) {
    els.next.textContent = '查看结果';
  } else {
    els.next.textContent = '下一题';
  }
  els.next.classList.remove('hidden');
  updateExitButtonVisibility();
}

function revealWrongBookFeedback(userAnswer, question, correct) {
  markOptions(userAnswer, question.answer);
  const rec = Storage.getRecord(question.id);
  const mastered = rec.consecutiveCorrect >= 2;

  els.feedback.className = `feedback-box ${correct ? 'correct' : 'wrong'}`;
  const correctText = question.answer.map((i) => question.options[i]).join('、');
  els.feedback.textContent = `${correct ? '回答正确' : '回答错误'}。正确答案：${correctText}。${question.explanation}`;

  if (mastered) {
    els.wbMasteryHint.textContent = '已掌握，移出错题本';
    els.wbMasteryHint.className = 'mastery-hint';
  } else if (correct) {
    els.wbMasteryHint.textContent = `连续答对 ${rec.consecutiveCorrect} / 2 次`;
    els.wbMasteryHint.className = 'mastery-hint';
  }

  const isLast = mastered
    ? state.activeQuestions.length <= 1
    : state.currentIndex === state.activeQuestions.length - 1;
  els.next.textContent = isLast ? '查看结果' : '下一题';
  els.next.classList.remove('hidden');
  updateExitButtonVisibility();
}

function advanceExamFlow() {
  if (state.currentIndex === state.activeQuestions.length - 1) {
    els.confirm.classList.add('hidden');
    els.submit.classList.remove('hidden');
    return;
  }
  state.currentIndex += 1;
  renderCurrentQuestion();
}

function submitAnswer(userAnswer) {
  if (state.answered) {
    return;
  }

  const question = state.activeQuestions[state.currentIndex];
  const correct = isCorrectAnswer(userAnswer, question);
  state.answered = true;
  Storage.recordAnswer(question.id, correct); // must be called before recordReview
  if (state.mode === 'review') Storage.recordReview(question.id, correct);

  if (correct) {
    state.correctCount += 1;
  } else {
    pushWrongItem(question);
  }

  if (state.mode === 'practice' || state.mode === 'review') {
    revealPracticeFeedback(userAnswer, question, correct);
  } else if (state.mode === 'wrongbook') {
    revealWrongBookFeedback(userAnswer, question, correct);
  } else {
    advanceExamFlow();
  }
}

function buildWrongItem(item) {
  const article = document.createElement('article');
  article.className = 'wrong-item';
  const h4 = document.createElement('h4');
  h4.textContent = `${item.category} · ${item.question}`;
  const p1 = document.createElement('p');
  p1.textContent = `正确答案：${item.correctAnswer.join('、')}`;
  const p2 = document.createElement('p');
  p2.textContent = `解析：${item.explanation}`;
  article.append(h4, p1, p2);
  return article;
}

function renderWrongBookResults() {
  Storage.clearSession();
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

function renderResults() {
  if (state.mode !== 'review') Storage.clearSession();
  const total = state.activeQuestions.length;
  const accuracy = total === 0 ? 0 : Math.round((state.correctCount / total) * 100);

  if (state.mode === 'practice' || state.mode === 'review') {
    els.resultTitle.textContent = state.mode === 'review' ? '今日复习完成' : '练习完成';
    els.resultScore.textContent = `答对 ${state.correctCount} / ${total} 题`;
    els.resultStatus.className = 'result-status';
    els.resultStatus.textContent = '';
    els.resultAccuracy.textContent = `正确率 ${accuracy}%`;
    els.resultAccuracy.classList.remove('hidden');
    els.retry.classList.toggle('hidden', state.mode === 'review');
  } else {
    const score = state.correctCount * 2;
    const passed = score >= 60;
    els.resultTitle.textContent = '考试结果';
    els.resultScore.textContent = `得分 ${score} / 100`;
    els.resultStatus.textContent = passed ? '通过' : '未通过';
    els.resultStatus.className = `result-status ${passed ? 'pass' : 'fail'}`;
    els.resultAccuracy.classList.add('hidden');
    els.retry.classList.add('hidden');
  }

  if (state.wrongItems.length === 0) {
    const placeholder = document.createElement('article');
    placeholder.className = 'wrong-item';
    const h4 = document.createElement('h4');
    h4.textContent = '本轮没有错题';
    const p = document.createElement('p');
    p.textContent = '继续保持。';
    placeholder.append(h4, p);
    els.wrongList.replaceChildren(placeholder);
  } else {
    els.wrongList.replaceChildren(...state.wrongItems.map(buildWrongItem));
  }

  updateWrongbookButton();
  showView('results');
}

function renderStats() {
  const catStats = Storage.getCategoryStats();
  const wrongIds = new Set(Storage.getWrongIds());
  const categories = [...new Set(questions.map((q) => q.category))];

  els.statsCategories.replaceChildren();

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

function toggleCategoryDetail(card, category) {
  const existing = card.querySelector('.stat-q-list');
  if (existing) {
    existing.remove();
    card.querySelector('.stat-collapse-btn')?.remove();
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
    counts.textContent = (record.correct === 0 && record.wrong === 0)
      ? '—'
      : `✓${record.correct} ✗${record.wrong}`;

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

els.practice.addEventListener('click', () => tryStartWithResume('practice', startPractice));
els.exam.addEventListener('click', () => tryStartWithResume('exam', startExam));
els.wrongbook.addEventListener('click', () => tryStartWithResume('wrongbook', startWrongBook));
els.stats.addEventListener('click', renderStats);
els.statsHome.addEventListener('click', () => {
  updateWrongbookButton();
  updateReviewButton();
  showView('home');
});
els.next.addEventListener('click', () => {
  if (state.mode === 'wrongbook') {
    const rec = Storage.getRecord(state.activeQuestions[state.currentIndex].id);
    if (rec.consecutiveCorrect >= 2) {
      state.masteredThisSession += 1;
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
    if (state.currentIndex === state.activeQuestions.length - 1) {
      renderWrongBookResults();
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
els.submit.addEventListener('click', renderResults);
els.retry.addEventListener('click', () => {
  if (state.mode === 'review') return;
  if (state.mode === 'wrongbook') {
    startWrongBook();
  } else {
    startPractice();
  }
});
els.homeButton.addEventListener('click', () => {
  updateWrongbookButton();
  updateReviewButton();
  showView('home');
});

els.exit.addEventListener('click', () => {
  if (state.mode !== 'review') {
    const snapshot = buildSessionSnapshot();
    if (state.answered) {
      snapshot.currentIndex = state.currentIndex + 1;
      snapshot.answered = false;
    }
    Storage.saveSession(snapshot);
  }
  updateWrongbookButton();
  showView('home');
});
els.btnResume.addEventListener('click', () => {
  const saved = Storage.loadSession();
  if (saved) resumeSession(saved);
});
els.btnDiscard.addEventListener('click', () => {
  Storage.clearSession();
  const fn = _pendingStart;
  hideResumeModal();
  if (fn) fn();
});

els.flashcard.addEventListener('click', startFlashcard);
els.fcCard.addEventListener('click', (e) => {
  e.preventDefault();
  stopSpeech();
  els.fcCard.classList.toggle('flipped');
});
els.fcPrev.addEventListener('click', () => {
  if (fcIndex > 0) {
    fcIndex -= 1;
    renderFlashcard(fcIndex);
  }
});
els.fcNext.addEventListener('click', () => {
  if (fcIndex === flashcards.length - 1) {
    fcIndex = 0;
    showView('home');
  } else {
    fcIndex += 1;
    renderFlashcard(fcIndex);
  }
});
els.fcExit.addEventListener('click', () => {
  fcIndex = 0;
  showView('home');
});

function handleSpeakClick(getTextFn) {
  if (window.speechSynthesis?.speaking) {
    stopSpeech();
    updateAllSpeakButtons(false);
  } else {
    speak(getTextFn());
  }
}
els.speak.addEventListener('click', () => handleSpeakClick(getQuizSpeakText));
els.fcSpeak.addEventListener('click', () => handleSpeakClick(getFcSpeakText));

els.review.addEventListener('click', startReview);

if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
  window.startPractice = startPractice;
  window.startExam = startExam;
  window.startWrongBook = startWrongBook;
  window.renderResults = renderResults;
  window.submitAnswer = submitAnswer;
  window.quizState = state;
  window.updateWrongbookButton = updateWrongbookButton;
  window.Storage = Storage;
  window.renderStats = renderStats;
  window.resumeSession = resumeSession;
  window.tryStartWithResume = tryStartWithResume;
  window.startFlashcard = startFlashcard;
  window.startReview = startReview;
  window.updateReviewButton = updateReviewButton;
}

updateWrongbookButton();
updateReviewButton();
if (!window.speechSynthesis) {
  els.speak.classList.add('hidden');
  els.fcSpeak.classList.add('hidden');
}

