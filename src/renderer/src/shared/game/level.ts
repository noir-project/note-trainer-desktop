import { VexNoteStringType } from '../components/music-staff.type'
import { LevelType } from './level.type'

export const BASE_NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const

export const BASSNOTE_STRINGS = [
  'c2',
  'd2',
  'e2',
  'f2',
  'g2',
  'a2',
  'b2',
  'c3',
  'd3',
  'e3',
  'f3',
  'g3',
  'a3'
]
export const TREBLENOTE_STRINGS = [
  'e4',
  'f4',
  'g4',
  'a4',
  'b4',
  'c5',
  'd5',
  'e5',
  'f5',
  'g5',
  'a5',
  'b5',
  'c6',
  'd6'
]
export const BOTHNOTE_STRINGS = ['b3', 'c4', 'd4']

const ALL_NOTE_STRINGS = [...BASSNOTE_STRINGS, ...TREBLENOTE_STRINGS, ...BOTHNOTE_STRINGS]

const toNoteObject = (noteStr: string): { note: VexNoteStringType; clef: 'treble' | 'bass' } => ({
  note: `${noteStr.toUpperCase()}/q` as VexNoteStringType,
  clef: 'treble' // Dummy clef, as it's determined in MusicStaff
})

const getNotesForOctaves = (
  octaves: string[]
): { note: VexNoteStringType; clef: 'treble' | 'bass' }[] => {
  return ALL_NOTE_STRINGS.filter((noteStr) => {
    const octaveMatch = noteStr.match(/\d/)
    if (!octaveMatch) return false
    return octaves.includes(octaveMatch[0])
  }).map(toNoteObject)
}

/** LEVEL CONFIGURATION */
export const LEVEL: LevelType[] = [
  {
    level: 1,
    type: 'single-note',
    maxExp: 20,
    description: 'Octave 4 notes. Mixed clefs.',
    notes: getNotesForOctaves(['4']),
    timeSignature: '1/4'
  },
  {
    level: 2,
    type: 'single-note',
    maxExp: 40,
    description: 'Octaves 3-4 notes. Mixed clefs.',
    notes: getNotesForOctaves(['3', '4']),
    timeSignature: '1/4'
  },
  {
    level: 3,
    type: 'single-note',
    maxExp: 20,
    description: 'Octave 5 notes.',
    notes: getNotesForOctaves(['5']),
    timeSignature: '1/4'
  },
  {
    level: 4,
    type: 'single-note',
    maxExp: 20,
    description: 'Octave 3 notes. Mixed clefs.',
    notes: getNotesForOctaves(['3']),
    timeSignature: '1/4'
  },
  {
    level: 5,
    type: 'single-note',
    maxExp: 60,
    description: 'Octaves 2-4 notes. Mixed clefs.',
    notes: getNotesForOctaves(['2', '3', '4']),
    timeSignature: '1/4'
  },
  {
    level: 6,
    type: 'single-note',
    maxExp: 80,
    description: 'Wider range (Octaves 2-5). Mixed clefs.',
    notes: getNotesForOctaves(['2', '3', '4', '5']),
    timeSignature: '1/4'
  },
  {
    level: 7,
    type: 'single-note',
    maxExp: 100,
    description: 'Full range challenge (C2-D6). Mixed clefs.',
    notes: ALL_NOTE_STRINGS.map(toNoteObject),
    timeSignature: '1/4'
  }
]
