import { Factory } from 'vexflow'
import { useEffect, useRef } from 'react'
import { MusicStaffPropsType } from './music-staff.type'

export const MusicStaff = ({
  note,
  clef,
  timeSignature
}: MusicStaffPropsType): React.JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null)
  const elementId = 'vexflow-output'

  useEffect(() => {
    if (!containerRef.current) return

    const { width, height } = containerRef.current.getBoundingClientRect()
    containerRef.current.innerHTML = ''

    const vf = new Factory({
      renderer: { elementId, width, height }
    })

    const score = vf.EasyScore()

    // --- dynamic Y offset depending on note pitch ---
    // Extract octave number from the note (e.g., "C3/q" -> 3)
    const octaveMatch = note.match(/\d/)
    const octave = octaveMatch ? parseInt(octaveMatch[0]) : 4

    // Base offset (centered)
    let yOffset = height * 0.25

    // If very low note on treble clef, shift up to show ledger lines
    if (clef === 'treble' && octave <= 3) {
      yOffset = height * 0.1
    }

    // If high note, lower the stave slightly
    if (clef === 'treble' && octave >= 6) {
      yOffset = height * 0.35
    }

    const system = vf.System({
      x: 0,
      y: yOffset,
      width: width
    })

    system
      .addStave({
        voices: [score.voice(score.notes(note), { time: timeSignature })]
      })
      .addClef(clef)

    vf.draw()
  }, [note, clef, timeSignature])

  return (
    <section className="flex-1 h-full mb-2 border border-gray-300 rounded-lg shadow-inner p-2">
      <div className="flex items-center h-full w-full">
        <div id={elementId} ref={containerRef} className="w-full" />
      </div>
    </section>
  )
}
