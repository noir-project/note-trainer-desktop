import { useState, useEffect } from 'react'
import { OctaveType } from './music-staff.type'
import { BASE_NOTES } from '../game/level'

type NoteButtonProps = {
  answer: string
  onNoteClick: (note: string) => void
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const NoteButton = ({ answer, onNoteClick }: NoteButtonProps): React.JSX.Element => {
  const [options, setOptions] = useState<string[]>([])

  useEffect(() => {
    if (!answer) return

    const correctNote = answer.split('/')[0] // e.g., 'A3' from 'A3/q'

    const uniqueNotes = new Set<string>()
    uniqueNotes.add(correctNote)

    const randomNotes: string[] = []
    const octaves: OctaveType[] = ['2', '3', '4', '5', '6']

    while (randomNotes.length < 8) {
      const randomNoteName = BASE_NOTES[Math.floor(Math.random() * BASE_NOTES.length)]
      const randomOctave = octaves[Math.floor(Math.random() * octaves.length)]
      const generatedNote = `${randomNoteName}${randomOctave}`

      if (!uniqueNotes.has(generatedNote)) {
        uniqueNotes.add(generatedNote)
        randomNotes.push(generatedNote)
      }
    }

    const allNotes = shuffleArray([correctNote, ...randomNotes])
    setOptions(allNotes)
  }, [answer])

  return (
    <section className="grid grid-cols-3 gap-2 border border-gray-300 rounded-lg p-2 shadow-2xl">
      {options.map((note, i) => {
        const base = note.match(/[A-G]#?b?/i)?.[0] ?? ''
        const octave = note.match(/\d+/)?.[0] ?? ''

        return (
          <button
            key={`${note}-${i}`}
            onClick={() => onNoteClick(note)}
            className={`relative flex flex-col items-center justify-center p-4 text-xl font-bold border rounded-lg active:bg-gray-200 hover:bg-gray-100`}
          >
            {/* Top-right: Octave */}
            <span className="absolute top-1 right-2 text-xs text-gray-400 font-medium">
              {octave}
            </span>

            {/* Center: Base note */}
            <span>{base}</span>
          </button>
        )
      })}
    </section>
  )
}
