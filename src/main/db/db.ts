import type { Database as SqliteDatabase } from 'better-sqlite3'
import Database from 'better-sqlite3'

export const db: SqliteDatabase = new Database('app.db')
