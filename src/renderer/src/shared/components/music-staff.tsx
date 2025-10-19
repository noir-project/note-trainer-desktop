import { BASSNOTE_STRINGS, BOTHNOTE_STRINGS, TREBLENOTE_STRINGS } from '../game/level'
import { Factory, Voice } from 'vexflow'
import { useEffect, useRef } from 'react'
import { MusicStaffPropsType } from './music-staff.type'

export const MusicStaff = ({
  note,
  timeSignature,
  spotlight,
  description
}: MusicStaffPropsType): React.JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null)
  const elementId = 'vexflow-output'

  useEffect(() => {
    if (containerRef.current) {
      const { width } = containerRef.current.getBoundingClientRect()
      containerRef.current.innerHTML = '' // Clear previous render

      const vf = new Factory({
        renderer: {
          elementId,
          width,
          height: 250 // Fixed height for grand staff
        }
      })
      const system = vf.System({
        width
      })

      const noteId = note.split('/')[0].toLowerCase()
      let clef: 'treble' | 'bass' | null = null

      if (BOTHNOTE_STRINGS.includes(noteId)) {
        clef = Math.random() < 0.5 ? 'bass' : 'treble'
      } else if (BASSNOTE_STRINGS.includes(noteId)) {
        clef = 'bass'
      } else if (TREBLENOTE_STRINGS.includes(noteId)) {
        clef = 'treble'
      }

      if (clef === null) return

      const [noteNameWithOctave, duration] = note.split('/')

      const noteName = noteNameWithOctave.slice(0, -1)
      const octave = noteNameWithOctave.slice(-1)
      const keys = [noteName + '/' + octave]

      let beat_value
      switch (duration) {
        case 'w':
          beat_value = 1
          break
        case 'h':
          beat_value = 2
          break
        case 'q':
          beat_value = 4
          break
        case '8':
          beat_value = 8
          break
        case '16':
          beat_value = 16
          break
        case '32':
          beat_value = 32
          break
        default:
          beat_value = 4
      }
      const voiceTime = `1/${beat_value}`

      const staveNote = vf.StaveNote({
        keys: keys,
        duration: duration,
        clef: clef
      })

      const voice = vf.Voice({ time: voiceTime }).addTickables([staveNote])

      const trebleVoices: Voice[] = []
      if (clef === 'treble') {
        trebleVoices.push(voice)
      }

      const bassVoices: Voice[] = []
      if (clef === 'bass') {
        bassVoices.push(voice)
      }

      system
        .addStave({
          voices: trebleVoices
        })
        .addClef('treble')

      system
        .addStave({
          voices: bassVoices
        })
        .addClef('bass')

      vf.draw()
    }
  }, [note, timeSignature])

  return (
    <section
      className={`flex-1 h-full mb-2 border border-gray-300 rounded-lg shadow-inner p-2 ${spotlight === null ? '' : spotlight ? 'ring-4 ring-green-400' : 'ring-4 ring-red-400'}`}
    >
      <div className="flex items-center h-full w-full relative">
        <div id={elementId} ref={containerRef} className="w-full" />
        <p className="text-xs text-gray-400 absolute inset-x-0 bottom-0 text-center">
          {description}
        </p>
      </div>
    </section>
  )
}
