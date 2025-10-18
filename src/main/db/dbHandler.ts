import { ipcMain } from 'electron'
import { db } from './db'
import type { GameRecordType } from './dbHandler.type'

// Create the game_records table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS game_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    level INTEGER NOT NULL,
    score INTEGER NOT NULL,
    streak INTEGER NOT NULL,
    accuracy REAL NOT NULL,
    exp INTEGER NOT NULL,
    created_at DATETIME DEFAULT (datetime('now', 'localtime'))
  )
`)

// Check if a record exists, if not, create one
const countStmt = db.prepare('SELECT count(*) as count FROM game_records')
const { count } = countStmt.get() as { count: number }

if (count === 0) {
  db.prepare(
    'INSERT INTO game_records (level, score, streak, accuracy, exp) VALUES (1, 0, 0, 0, 0)'
  ).run()
}

ipcMain.handle(
  'update-game-record',
  (_event, id: number, record: Partial<Omit<GameRecordType, 'id' | 'created_at'>>) => {
    const existingRecord = db.prepare('SELECT * FROM game_records WHERE id = ?').get(id) as
      | GameRecordType
      | undefined
    if (!existingRecord) return

    const updatedRecord = { ...existingRecord, ...record }

    const stmt = db.prepare(
      'UPDATE game_records SET level = ?, score = ?, streak = ?, accuracy = ?, exp = ? WHERE id = ?'
    )
    stmt.run(
      updatedRecord.level,
      updatedRecord.score,
      updatedRecord.streak,
      updatedRecord.accuracy,
      updatedRecord.exp,
      id
    )
  }
)

ipcMain.handle('get-game-record', (_event, id: number) => {
  const stmt = db.prepare('SELECT * FROM game_records WHERE id = ?')
  const data = stmt.get(id)
  return data
})
