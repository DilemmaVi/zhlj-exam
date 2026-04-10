'use strict';

const state = {
  mode: 'practice',
  activeQuestions: [],
  currentIndex: 0,
  selectedOptions: [],
  answered: false,
  correctCount: 0,
  wrongItems: []
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
  statsCategories: document.getElementById('stats-categories')
};

function showView(name) {
  [els.home, els.quiz, els.results, els.statsView].forEach((v) => v.classList.remove('active'));
  const target = name === 'stats' ? els.statsView : els[name];
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
}

function updateWrongbookButton() {
  const count = Storage.getWrongCount();
  els.wrongbook.textContent = `错题本（${count}题）`;
  els.wrongbook.disabled = count === 0;
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
  resetSession('practice', [...questions]);
  showView('quiz');
  renderCurrentQuestion();
}

function startExam() {
  resetSession('exam', pickExamQuestions());
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
  const current = state.activeQuestions[state.currentIndex];
  state.selectedOptions = [];
  state.answered = false;

  updateProgress();
  els.category.textContent = current.category;
  els.question.textContent = current.question;
  els.options.innerHTML = '';
  clearFeedback();
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
  Storage.recordAnswer(question.id, correct);

  if (correct) {
    state.correctCount += 1;
  } else {
    pushWrongItem(question);
  }

  if (state.mode === 'practice') {
    revealPracticeFeedback(userAnswer, question, correct);
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

function renderResults() {
  const total = state.activeQuestions.length;
  const accuracy = total === 0 ? 0 : Math.round((state.correctCount / total) * 100);

  if (state.mode === 'practice') {
    els.resultTitle.textContent = '练习完成';
    els.resultScore.textContent = `答对 ${state.correctCount} / ${total} 题`;
    els.resultStatus.className = 'result-status';
    els.resultAccuracy.textContent = `正确率 ${accuracy}%`;
    els.resultAccuracy.classList.remove('hidden');
    els.retry.classList.remove('hidden');
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

els.practice.addEventListener('click', startPractice);
els.exam.addEventListener('click', startExam);
els.next.addEventListener('click', () => {
  if (state.currentIndex === state.activeQuestions.length - 1) {
    renderResults();
    return;
  }
  state.currentIndex += 1;
  renderCurrentQuestion();
});
els.submit.addEventListener('click', renderResults);
els.retry.addEventListener('click', startPractice);
els.homeButton.addEventListener('click', () => {
  updateWrongbookButton();
  showView('home');
});

if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
  window.startPractice = startPractice;
  window.startExam = startExam;
  window.renderResults = renderResults;
  window.submitAnswer = submitAnswer;
  window.quizState = state;
}

updateWrongbookButton();

