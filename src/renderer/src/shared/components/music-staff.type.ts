export type NoteNameType =
  | 'C'
  | 'Cb'
  | 'C#'
  | 'D'
  | 'Db'
  | 'D#'
  | 'E'
  | 'Eb'
  | 'E#'
  | 'F'
  | 'Fb'
  | 'F#'
  | 'G'
  | 'Gb'
  | 'G#'
  | 'A'
  | 'Ab'
  | 'A#'
  | 'B'
  | 'Bb'
  | 'B#'

export type OctaveType = '2' | '3' | '4' | '5' | '6'

export type DurationType =
  | 'w' // whole
  | 'h' // half
  | 'q' // quarter
  | '8' // eighth
  | '16' // sixteenth
  | '32' // thirty-second

export type VexNoteStringType = `${NoteNameType}${OctaveType}/${DurationType}`

export type TimeSignatureType =
  | '1/4'
  | '2/4'
  | '3/4'
  | '4/4'
  | '2/2'
  | '3/8'
  | '6/8'
  | '9/8'
  | '12/8'

export type MusicStaffPropsType = {
  note: VexNoteStringType
  timeSignature: TimeSignatureType
  spotlight: boolean | null
  description: string
}
