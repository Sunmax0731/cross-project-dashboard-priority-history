import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeItems, renderMarkdownReport } from '../src/core.mjs';

test('valid sample passes required field checks', () => {
  const report = analyzeItems({ items: [{
  "id": "cross-project-dashboard-priority-history-1",
  "title": "横断プロジェクト優先度履歴ダッシュボード サンプル1",
  "status": "ready",
  "project": "cross-project-dashboard-priority-history",
  "priority": "P0",
  "lastUpdated": "2026-05-08"
}] });
  assert.equal(report.summary.result, 'passed');
  assert.equal(report.summary.errors, 0);
});

test('missing required field is reported', () => {
  const report = analyzeItems({ items: [{
  "id": "cross-project-dashboard-priority-history-missing-required",
  "title": "必須項目不足サンプル",
  "status": "ready",
  "priority": "P0",
  "lastUpdated": "2026-05-08"
}] });
  assert.equal(report.summary.result, 'failed');
  assert.equal(report.summary.errors, 1);
  assert.match(renderMarkdownReport(report), /未設定/);
});
