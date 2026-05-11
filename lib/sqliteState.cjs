const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const dbCache = new Map();

function getDb(dbPath) {
  if (dbCache.has(dbPath)) return dbCache.get(dbPath);
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const db = new DatabaseSync(dbPath);
  db.exec(`
    CREATE TABLE IF NOT EXISTS app_state (
      state_key TEXT PRIMARY KEY,
      state_value TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);
  dbCache.set(dbPath, db);
  return db;
}

function loadJsonState(dbPath, stateKey, defaultFactory) {
  const db = getDb(dbPath);
  const row = db
    .prepare('SELECT state_value FROM app_state WHERE state_key = ?')
    .get(stateKey);
  if (!row || typeof row.state_value !== 'string') {
    return defaultFactory();
  }
  try {
    return JSON.parse(row.state_value);
  } catch {
    return defaultFactory();
  }
}

function saveJsonState(dbPath, stateKey, state) {
  const db = getDb(dbPath);
  const payload = JSON.stringify(state);
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO app_state (state_key, state_value, updated_at)
    VALUES (?, ?, ?)
    ON CONFLICT(state_key) DO UPDATE SET
      state_value = excluded.state_value,
      updated_at = excluded.updated_at
  `).run(stateKey, payload, now);
}

module.exports = {
  loadJsonState,
  saveJsonState,
};
