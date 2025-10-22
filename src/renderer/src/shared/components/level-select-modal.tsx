import React, { useState } from 'react'
import ReactModal from 'react-modal'
import { LEVEL } from '../game/level'
import type { LevelType } from '../game/level.type'

type Props = {
  isOpen: boolean
  onClose: () => void
  currentLevel: number
  onApply: (level: number) => void
  onReset: () => void
}

export function LevelSelectModal({
  isOpen,
  onClose,
  currentLevel,
  onApply,
  onReset
}: Props): React.JSX.Element {
  const [selectedLevel, setSelectedLevel] = useState(currentLevel)

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full mx-auto mt-32 border border-gray-200 focus:outline-none"
      overlayClassName="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start"
      ariaHideApp={false}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">🎵 Select Level</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          onApply(selectedLevel)
          onClose()
        }}
        className="flex flex-col gap-4"
      >
        <label className="flex flex-col text-sm text-gray-700">
          <span className="mb-1">Choose Level</span>
          <select
            name="level"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(Number(e.target.value))}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
          >
            {LEVEL.map((lv: LevelType) => (
              <option key={lv.level} value={lv.level}>
                Level {lv.level} — {lv.type.replace('-', ' ')}
              </option>
            ))}
          </select>
        </label>

        {LEVEL.find((lv) => lv.level === selectedLevel)?.description && (
          <p className="text-sm text-gray-500 italic text-center">
            {LEVEL.find((lv) => lv.level === selectedLevel)?.description}
          </p>
        )}

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={() => {
              onReset()
              onClose()
            }}
            className="text-xs text-red-500 hover:text-red-700 underline"
          >
            Reset Progress
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 text-sm rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
              Apply
            </button>
          </div>
        </div>
      </form>
    </ReactModal>
  )
}
