import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface GameRecord {
    id: number
    level: number
    score: number
    streak: number
    accuracy: number
    correct_count: number
    total_count: number
    exp: number
    created_at: string
  }

  interface Window {
    electron: ElectronAPI
    api: {
      getGameRecord: (id: number) => Promise<GameRecord>
      updateGameRecord: (
        id: number,
        record: {
          level?: number
          score?: number
          streak?: number
          accuracy?: number
          exp?: number
          correct_count?: number
          total_count?: number
        }
      ) => Promise<void>
    }
  }
}
