const fs = require('fs');
const path = require('path');
const { loadJsonState, saveJsonState } = require('../lib/sqliteState.cjs');

const ROOT = path.resolve(__dirname, '..');
const JSON_PATH = path.join(ROOT, 'data', 'dashboard-store.json');
const SQLITE_PATH = path.join(ROOT, 'data', 'dashboard.sqlite');
const STATE_KEY = 'dashboard_store';

function defaultStore() {
  return {
    totals: {
      enquiries: 0,
      chatbotLeads: 0,
      websiteLeads: 0,
      chatSessions: 0,
      chatMessages: 0,
      chatbotContactCaptures: 0,
    },
    enquiries: [],
    chatbotContacts: [],
    chatActivity: [],
    conversations: [],
    liveSessions: {},
    meta: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
}

function arrayById(items) {
  const map = new Map();
  (items || []).forEach((item) => {
    const key = item && item.id ? String(item.id) : `${Math.random()}`;
    map.set(key, item);
  });
  return Array.from(map.values());
}

function mergeStores(existingStore, jsonStore) {
  const existing = { ...defaultStore(), ...(existingStore || {}) };
  const incoming = { ...defaultStore(), ...(jsonStore || {}) };
  return {
    ...existing,
    totals: {
      ...existing.totals,
      ...incoming.totals,
    },
    enquiries: arrayById([...(existing.enquiries || []), ...(incoming.enquiries || [])]),
    chatbotContacts: arrayById([...(existing.chatbotContacts || []), ...(incoming.chatbotContacts || [])]),
    chatActivity: arrayById([...(existing.chatActivity || []), ...(incoming.chatActivity || [])]),
    conversations: arrayById([...(existing.conversations || []), ...(incoming.conversations || [])]),
    liveSessions: {
      ...(existing.liveSessions || {}),
      ...(incoming.liveSessions || {}),
    },
    meta: {
      ...(existing.meta || {}),
      ...(incoming.meta || {}),
      migratedAt: new Date().toISOString(),
      migrationSource: JSON_PATH,
    },
  };
}

function run() {
  if (!fs.existsSync(JSON_PATH)) {
    console.error(`No JSON log file found at: ${JSON_PATH}`);
    process.exit(1);
  }

  const jsonRaw = fs.readFileSync(JSON_PATH, 'utf8');
  let jsonStore;
  try {
    jsonStore = JSON.parse(jsonRaw);
  } catch (error) {
    console.error('Failed to parse JSON log file:', error.message);
    process.exit(1);
  }

  const existingSqliteState = loadJsonState(SQLITE_PATH, STATE_KEY, defaultStore);
  const merged = mergeStores(existingSqliteState, jsonStore);
  saveJsonState(SQLITE_PATH, STATE_KEY, merged);

  console.log('Migration complete.');
  console.log(`JSON source:    ${JSON_PATH}`);
  console.log(`SQLite target:  ${SQLITE_PATH}`);
  console.log(`Enquiries:      ${merged.enquiries.length}`);
  console.log(`Conversations:  ${merged.conversations.length}`);
}

run();
