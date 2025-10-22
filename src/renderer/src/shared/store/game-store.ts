import { create } from 'zustand'
import { LevelType } from '../game/level.type'
import { LEVEL } from '../game/level'
import { getRandomNumber } from '../helper/getRandomNumber'

// NOTE: This application is designed for a single user, so the user ID is hardcoded.
const USER_ID = 1

type updateGameRecordType = {
  level?: number
  accuracy?: number
  exp?: number
  streak?: number
  score?: number
  correct_count?: number
  total_count?: number
}

export type UseGameStatType = {
  gameData: LevelType | null
  level: number
  exp: number
  score: number
  streak: number
  accuracy: number
  correctCount: number
  totalCount: number
  answerNote: string
  spotlight: boolean | null
  fetchPlayerRecord: () => Promise<void>
  updateGameRecord: (arg: updateGameRecordType, fetch?: boolean) => void
  handleAnswerClick: (selected: string) => void
  generateNewAnswerNote: () => void
  setGameDataByLevel: (level: number) => void
  resetGame: () => void
  init: () => void
}

export const useGameStat = create<UseGameStatType>((set, get) => ({
  gameData: null,
  level: 1,
  exp: 0,
  score: 0,
  streak: 0,
  accuracy: 0,
  correctCount: 0,
  totalCount: 0,
  answerNote: '',
  spotlight: null,

  fetchPlayerRecord: async () => {
    const record = await window.api.getGameRecord(USER_ID)
    if (!record) return

    set({
      level: record.level,
      exp: record.exp,
      score: record.score,
      streak: record.streak,
      accuracy: record.accuracy,
      correctCount: record.correct_count,
      totalCount: record.total_count
    })
    get().setGameDataByLevel(record.level)
  },

  updateGameRecord: async (arg, fetch = true) => {
    await window.api.updateGameRecord(USER_ID, arg)
    if (fetch) {
      await get().fetchPlayerRecord()
    }
  },

  generateNewAnswerNote: () => {
    const { gameData, answerNote } = get()
    if (!gameData || gameData.notes.length === 0) return

    let newAnswer = gameData.notes[getRandomNumber(gameData.notes.length - 1)]
    while (newAnswer.note === answerNote) {
      newAnswer = gameData.notes[getRandomNumber(gameData.notes.length - 1)]
    }
    set({ answerNote: newAnswer.note })
  },

  handleAnswerClick: (selected: string) => {
    const {
      answerNote,
      correctCount,
      totalCount,
      gameData,
      level,
      exp,
      score,
      streak,
      updateGameRecord
    } = get()

    const isCorrect = selected === answerNote.split('/')[0]
    const newCorrectCount = isCorrect ? correctCount + 1 : correctCount
    const newTotalCount = totalCount + 1
    const newAccuracy = (newCorrectCount / newTotalCount) * 100

    let newLevel = level
    let newExp = exp
    let newScore = score
    let newStreak = 0

    if (isCorrect) {
      if (gameData?.maxExp === exp) {
        newLevel = level + 1
        newExp = 0
      } else {
        newExp = exp + 1
      }
      newScore = score + 1
      newStreak = streak + 1
    }

    updateGameRecord({
      accuracy: newAccuracy,
      exp: newExp,
      level: newLevel,
      score: newScore,
      streak: newStreak,
      correct_count: newCorrectCount,
      total_count: newTotalCount
    })

    set({ spotlight: isCorrect })

    setTimeout(() => {
      set({ spotlight: null })
    }, 500)
  },

  setGameDataByLevel: (level: number) => {
    const levelData = LEVEL.find((lv) => lv.level === level)
    set({ gameData: levelData || null, level })
    get().generateNewAnswerNote()
    get().updateGameRecord({ level }, false)
  },

  resetGame: () => {
    get().updateGameRecord({
      level: 1,
      accuracy: 0,
      exp: 0,
      score: 0,
      streak: 0,
      correct_count: 0,
      total_count: 0
    })
  },

  init: () => {
    get().fetchPlayerRecord()
  }
}))
