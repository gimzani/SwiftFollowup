//----------------------------------------------------------------------
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import pg from 'pg';
import { seed } from './dbSeed.js';
//----------------------------------------------------------------------
const { Client } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//----------------------------------------------------------------------
//----------------------------------------------------------------------

// ─── Connection Config ────────────────────────────────────────────────────────
// PG_CONNECTION is injected by --env-file=.env.dev in the npm script.

const connectionUrl = new URL(process.env.PG_CONNECTION);

const DB_NAME = connectionUrl.pathname.replace('/', '');
const DB_CONFIG = {
  host: connectionUrl.hostname,
  port: Number(connectionUrl.port) || 5432,
  user: connectionUrl.username,
  password: connectionUrl.password,
};

// ─── SQL File Paths ───────────────────────────────────────────────────────────

const SCHEMA_PATH = resolve(__dirname, '../database/schema.sql');
const SEED_PATH   = resolve(__dirname, '../database/seed.json');

// ─── Helpers ──────────────────────────────────────────────────────────────────

function log(step, message) {
  console.log(`[STEP ${step}] ${message}`);
}

async function runSqlFile(client, filePath) {
  const sql = readFileSync(filePath, 'utf8');
  await client.query(sql);
}

async function readJsonFile(client, filePath) {
  const json = readFileSync(filePath, 'utf8');
 return JSON.parse(json);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function rebuildDatabase() {
  console.log('\n========================================');
  console.log(` DB REBUILD — ${DB_NAME}`);
  console.log('========================================\n');

  // ── Step 1: Drop the database ────────────────────────────────────────────
  const sysClient = new Client({ ...DB_CONFIG, database: 'postgres' });
  try {
    await sysClient.connect();
    log(1, `Dropping database "${DB_NAME}" if it exists...`);
    await sysClient.query(`DROP DATABASE IF EXISTS "${DB_NAME}"`);
    console.log(`       ✓ Database "${DB_NAME}" dropped.\n`);
  } catch (err) {
    console.error(`       ✗ Failed to drop database: ${err.message}`);
    await sysClient.end();
    process.exit(1);
  }

  // ── Step 2: Recreate the database ────────────────────────────────────────
  try {
    log(2, `Creating database "${DB_NAME}"...`);
    await sysClient.query(`CREATE DATABASE "${DB_NAME}"`);
    console.log(`       ✓ Database "${DB_NAME}" created.\n`);
  } catch (err) {
    console.error(`       ✗ Failed to create database: ${err.message}`);
    await sysClient.end();
    process.exit(1);
  } finally {
    await sysClient.end();
  }

  // ── Step 3: Apply schema ─────────────────────────────────────────────────
  const appClient = new Client({ ...DB_CONFIG, database: DB_NAME });
  try {
    await appClient.connect();
    log(3, 'Applying schema.sql...');
    await runSqlFile(appClient, SCHEMA_PATH);
    console.log('       ✓ Schema applied.\n');
  } catch (err) {
    console.error(`       ✗ Failed to apply schema: ${err.message}`);
    await appClient.end();
    process.exit(1);
  }

  // ── Step 4: Run seed ─────────────────────────────────────────────────────
  try {
    log(4, 'Running seed.json...');
    let seedData = await readJsonFile(appClient, SEED_PATH);
    await seed(appClient, seedData);
    console.log('       ✓ Seed data inserted.\n');
  } catch (err) {
    console.error(`       ✗ Failed to run seed: ${err.message}`);
    await appClient.end();
    process.exit(1);
  } finally {
    await appClient.end();
  }

  console.log('========================================');
  console.log(' ✓ Database rebuild complete!');
  console.log('========================================\n');
}

rebuildDatabase();
