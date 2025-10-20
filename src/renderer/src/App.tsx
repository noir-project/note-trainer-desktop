import { MusicStaff } from './shared/components/music-staff'
import { NoteButton } from './shared/components/note-button'
import { StatChart } from './shared/components/stat-chart'
import { useState, useEffect, useRef } from 'react'
import type { VexNoteStringType } from './shared/components/music-staff.type'
import { useGameStat, UseGameStatType } from './shared/store/game-store'
import { LevelSelectModal } from './shared/components/level-select-modal'
import { useConfetti } from './shared/hooks/useConfetti'

function App(): React.JSX.Element {
  // zustand store
  const {
    gameData,
    level,
    exp,
    score,
    streak,
    accuracy,
    answerNote,
    spotlight,
    handleAnswerClick,
    setGameDataByLevel,
    resetGame,
    init
  } = useGameStat<UseGameStatType>((states) => states)

  // state: modal
  const [isModal, setIsModal] = useState(false)
  const { fireConfetti } = useConfetti()
  const prevLevelRef = useRef(level)

  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (streak > 0 && streak % 10 === 0) {
      fireConfetti('fireworks', 'fire')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streak])

  useEffect(() => {
    if (level > prevLevelRef.current) {
      fireConfetti('schoolPride', 'gold')
    }
    prevLevelRef.current = level
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level])

  return (
    <div className="flex flex-col border border-black h-[100dvh] p-3">
      {/* modal */}

      <StatChart
        level={level}
        score={score}
        streak={streak}
        accuracy={accuracy}
        currentExp={exp}
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
          setGameDataByLevel(newLevel)
        }}
        onReset={resetGame}
      />
    </div>
  )
}

export default App
