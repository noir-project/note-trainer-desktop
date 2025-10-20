import { ipcMain } from 'electron'
import { db } from './db'
import type { GameRecordType } from './dbHandler.type'

// NOTE: This application is designed for a single user, so the user ID is hardcoded to 1.

ipcMain.handle(
  'update-game-record',
  (_event, id: number, record: Partial<Omit<GameRecordType, 'id' | 'created_at'>>) => {
    try {
      const existingRecord = db.prepare('SELECT * FROM game_records WHERE id = ?').get(id) as
        | GameRecordType
        | undefined
      if (!existingRecord) return

      const updatedRecord = { ...existingRecord, ...record }

      const stmt = db.prepare(
        'UPDATE game_records SET level = ?, score = ?, streak = ?, accuracy = ?, exp = ?, correct_count = ?, total_count = ? WHERE id = ?'
      )
      stmt.run(
        updatedRecord.level,
        updatedRecord.score,
        updatedRecord.streak,
        updatedRecord.accuracy,
        updatedRecord.exp,
        updatedRecord.correct_count,
        updatedRecord.total_count,
        id
      )
    } catch (error) {
      console.error('Failed to update game record:', error)
      throw error
    }
  }
)

ipcMain.handle('get-game-record', (_event, id: number) => {
  try {
    const stmt = db.prepare('SELECT * FROM game_records WHERE id = ?')
    const data = stmt.get(id)
    return data
  } catch (error) {
    console.error('Failed to get game record:', error)
    throw error
  }
})
