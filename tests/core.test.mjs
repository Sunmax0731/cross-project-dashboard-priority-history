import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeItems, renderMarkdownReport } from '../src/core.mjs';

test('valid sample passes required field checks', () => {
  const report = analyzeItems({ items: [{
  "id": "dashboard-1",
  "title": "横断ダッシュボード・履歴・優先度管理 サンプル 1",
  "project": "cross-project-dashboard-priority-history",
  "priority": "P0",
  "status": "ready",
  "lastUpdated": "2026-05-08"
}] });
  assert.equal(report.summary.result, 'passed');
  assert.equal(report.summary.errors, 0);
});

test('missing required field is reported', () => {
  const report = analyzeItems({ items: [{
  "id": "dashboard-missing-required",
  "title": "必須項目不足サンプル",
  "priority": "P0",
  "status": "ready",
  "lastUpdated": "2026-05-08"
}] });
  assert.equal(report.summary.result, 'failed');
  assert.equal(report.summary.errors, 1);
  assert.match(renderMarkdownReport(report), /未設定/);
});
