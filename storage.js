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
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Storage._save failed:', e);
    }
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
    if (typeof questions === 'undefined') return {};
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
    if (typeof questions === 'undefined') return [];
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
  },

  SESSION_KEY: 'zhlj_quiz_session',

  saveSession(sessionData) {
    try {
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
    } catch (e) {
      console.warn('Storage.saveSession failed:', e);
    }
  },

  loadSession() {
    try {
      const raw = localStorage.getItem(this.SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  clearSession() {
    try {
      localStorage.removeItem(this.SESSION_KEY);
    } catch (e) {
      console.warn('Storage.clearSession failed:', e);
    }
  }
};
