import { VexNoteStringType, TimeSignatureType } from '../components/music-staff.type'

export type LevelType = {
  level: number
  type: 'single-note' | 'key-recognition'
  maxExp: number
  notes: { note: VexNoteStringType; clef: 'treble' | 'bass' }[]
  timeSignature: TimeSignatureType
}
