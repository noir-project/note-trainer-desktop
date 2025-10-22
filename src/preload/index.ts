import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getGameRecord: (id: number) => ipcRenderer.invoke('get-game-record', id),
  updateGameRecord: (
    id: number,
    record: {
      level?: number
      score?: number
      correct_count?: number
      total_count?: number
      streak?: number
      accuracy?: number
      exp?: number
    }
  ) => ipcRenderer.invoke('update-game-record', id, record)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
