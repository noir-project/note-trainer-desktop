// progress: x2 of total notes

import { VexNoteStringType } from '../components/music-staff.type'
import { LevelType } from './level.type'

const BASE_NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

const generateOctaveNotes = (octave: '3' | '4' | '5' | '6'): { note: VexNoteStringType }[] => {
  return BASE_NOTES.map((n) => ({ note: `${n}${octave}/q` as VexNoteStringType }))
}

// function that will return a list of note with clef
const assignClefToNotes = (
  notes: { note: VexNoteStringType }[],
  clef: 'treble' | 'bass'
): { note: VexNoteStringType; clef: 'treble' | 'bass' }[] => {
  return notes.map((n) => ({
    ...n,
    clef
  }))
}

export const LEVEL: LevelType[] = [
  {
    level: 1,
    type: 'single-note',
    maxExp: 20,
    notes: assignClefToNotes(generateOctaveNotes('5'), 'treble'),
    timeSignature: '1/4'
  },
  {
    level: 2,
    type: 'single-note',
    maxExp: 30,
    notes: assignClefToNotes(generateOctaveNotes('5'), 'bass'),
    timeSignature: '1/4'
  },
  {
    level: 3,
    type: 'single-note',
    maxExp: 40,
    notes: [
      ...assignClefToNotes(generateOctaveNotes('5'), 'treble'),
      ...assignClefToNotes(generateOctaveNotes('5'), 'bass')
    ],
    timeSignature: '1/4'
  }
]
