import electronLogo from './assets/electron.svg'

function App(): React.JSX.Element {
  const ipcHandle = (): void => {
    window.electron.ipcRenderer.send('ping')

    console.log('hello')
  }

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <p className="text-red-900 underline">hello</p>
      <button onClick={ipcHandle} className="bg-red-900">
        send IPC
      </button>
    </>
  )
}

export default App
