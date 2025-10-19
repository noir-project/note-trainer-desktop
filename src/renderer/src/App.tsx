import { MusicStaff } from './shared/components/music-staff'
import { NoteButton } from './shared/components/note-button'
import { StatChart } from './shared/components/stat-chart'
import { LEVEL } from './shared/game/level'
import { useState, useEffect, useCallback } from 'react'
import { LevelType } from './shared/game/level.type'
import type { VexNoteStringType } from './shared/components/music-staff.type'
import { getRandomNumber } from './shared/helper/getRandomNumber'
import { LevelSelectModal } from './shared/components/level-select-modal'

function App(): React.JSX.Element {
  // state: stat
  const [level, setLevel] = useState(1)

  // state: game
  const [gameData, setGameData] = useState<LevelType | null>()
  const [currentExp, setCurrentExp] = useState(0)
  const [currentScore, setCurrentScore] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [currentAccuracy, setCurrentAccuracy] = useState(0)
  const [answerNote, setAnswerNote] = useState<string>('')
  const [spotlight, setSpotlight] = useState<boolean | null>(null)

  // state: modal
  const [isModal, setIsModal] = useState(false)

  const fetchPlayerRecord = async (): Promise<void> => {
    const record = await window.api.getGameRecord(1)
    if (!record) return

    setLevel(record?.level || 1)
    setCurrentExp(record?.exp || 0)
    setCurrentScore(record?.score || 0)
    setCurrentStreak(record?.streak || 0)
    setCurrentAccuracy(record?.accuracy || 0)
  }

  const updateGameRecord = async ({
    level,
    accuracy,
    exp,
    streak,
    score
  }: {
    level?: number
    accuracy?: number
    exp?: number
    streak?: number
    score?: number
  }): Promise<void> => {
    await window.api.updateGameRecord(1, { level, accuracy, exp, score, streak })
    fetchPlayerRecord()
  }

  const generateNewAnswerNote = useCallback(() => {
    if (!gameData) return
    if (gameData.notes.length === 0) return

    let newAnswer = gameData.notes[getRandomNumber(gameData.notes.length - 1)]
    while (newAnswer.note === answerNote) {
      newAnswer = gameData.notes[getRandomNumber(gameData.notes.length - 1)]
    }
    setAnswerNote(newAnswer.note)
  }, [gameData, answerNote])

  const handleAnswerClick = (selected: string): void => {
    // correct
    if (selected === answerNote.split('/')[0]) {
      setSpotlight(true)
      generateNewAnswerNote()
    }
    // false
    else {
      setSpotlight(false)
      generateNewAnswerNote()
    }

    setTimeout(() => {
      setSpotlight(null)
    }, 500)
  }

  useEffect(() => {
    fetchPlayerRecord()
  }, [])

  useEffect(() => {
    const levelData = LEVEL.find((lv) => lv.level === level)
    setGameData(levelData || null)
  }, [level])

  useEffect(() => {
    if (gameData) {
      generateNewAnswerNote()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData])

  return (
    <div className="flex flex-col border border-black h-[100dvh] p-3">
      {/* modal */}

      <StatChart
        level={level}
        score={currentScore}
        streak={currentStreak}
        accuracy={currentAccuracy}
        currentExp={currentExp}
        maxExp={gameData?.maxExp || 0}
      />
      <MusicStaff
        note={answerNote as VexNoteStringType}
        timeSignature="1/4"
        spotlight={spotlight}
        description={gameData?.description || ''}
      />
      <NoteButton answer={answerNote} onNoteClick={handleAnswerClick} />
      <div className="flex w-full justify-center">
        <button
          className="underline text-xs text-gray-400 hover:text-gray-700 min-w-fit "
          onClick={() => {
            setIsModal(!isModal)
          }}
        >
          select level
        </button>
      </div>

      {/* modal */}
      <LevelSelectModal
        isOpen={isModal}
        onClose={() => setIsModal(false)}
        currentLevel={level}
        onApply={(newLevel) => {
          setLevel(newLevel)
        }}
        onReset={() => {
          updateGameRecord({ level: 1, accuracy: 0, exp: 0, score: 0, streak: 0 })
        }}
      />
    </div>
  )
}

export default App
