import { MusicStaff } from './shared/components/music-staff'
import { NoteButton } from './shared/components/note-button'
import { StatChart } from './shared/components/stat-chart'
import { LEVEL } from './shared/game/level'
import { useState, useEffect } from 'react'
import { LevelType } from './shared/game/level.type'

const TEMP_STAT_DATA = [
  {
    id: 1,
    name: 'level',
    value: 1
  },
  {
    id: 2,
    name: 'score',
    value: 1
  },
  {
    id: 3,
    name: 'streak',
    value: 1
  },
  {
    id: 4,
    name: 'accuracy',
    value: '100%'
  }
]

function App(): React.JSX.Element {
  // state: stat
  const [level] = useState(3)

  // state: game
  const [gameData, setGameData] = useState<LevelType | null>()

  useEffect(() => {
    const levelData = LEVEL.find((lv) => lv.level === level)
    setGameData(levelData || null)
  }, [level])

  useEffect(() => {
    console.log(gameData)
  }, [gameData])

  const getGameRecord = async (): Promise<GameRecord | undefined> => {
    const record = await window.api.getGameRecord(1)
    console.log('Game Record:', record)
    return record
  }

  const updateGameRecord = async (): Promise<void> => {
    console.log('updating game record')
    await window.api.updateGameRecord(1, { level: 2, score: 150 })
  }

  return (
    <div className="flex flex-col border border-black h-[100dvh] p-3">
      <StatChart data={TEMP_STAT_DATA} currentExp={90} maxExp={110} />
      <MusicStaff clef="treble" note="C3/q" timeSignature="1/4" />
      <NoteButton />
      <button onClick={getGameRecord}>Get Game Record by ID 1</button>
      <button onClick={updateGameRecord}>Update Game Record ID 1</button>
    </div>
  )
}

export default App
