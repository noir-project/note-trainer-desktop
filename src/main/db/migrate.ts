import { db } from './db'
import fs from 'fs'
import path from 'path'
import { app } from 'electron'

const isDev = !app.isPackaged

const MIGRATIONS_DIR = isDev
  ? path.join(process.cwd(), 'src/main/db/migrations')
  : path.join(process.resourcesPath, 'migrations')

// Initialize the migrations table
db.exec(`
  CREATE TABLE IF NOT EXISTS migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT (datetime('now', 'localtime'))
  )
`)

// Get the list of executed migrations
const executedMigrations = db.prepare('SELECT name FROM migrations').all() as { name: string }[]
const executedMigrationNames = new Set(executedMigrations.map((m) => m.name))

// Read all migration files
const migrationFiles = fs.readdirSync(MIGRATIONS_DIR).sort()

// Execute pending migrations
for (const file of migrationFiles) {
  if (executedMigrationNames.has(file)) continue

  const migration = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf-8')
  db.exec(migration)

  // Record the migration
  db.prepare('INSERT INTO migrations (name) VALUES (?)').run(file)

  console.log(`Migration ${file} executed successfully.`)
}

// Check if a record exists, if not, create one
const countStmt = db.prepare('SELECT count(*) as count FROM game_records')
const { count } = countStmt.get() as { count: number }

if (count === 0) {
  db.prepare(
    'INSERT INTO game_records (level, score, streak, accuracy, exp, correct_count, total_count) VALUES (1, 0, 0, 0, 0, 0, 0)'
  ).run()
  console.log('Initial game record created.')
}
