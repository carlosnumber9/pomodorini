import { useState, type ChangeEvent } from 'react'
import { usePomodorini } from './usePomodorini';
import { Pomio } from './components';
import type { Mode } from './declarations';
import './App.css'

function App() {
  const [hours, setHours] = useState<number>(0);
  const [mode, setMode] = useState<Mode>('IDLE');
  const detailedTimeLeft: string = usePomodorini(hours, mode, setMode);
  return (
    <>
      <h1>Pomodorini</h1>
      <Pomio />
      {mode === 'IDLE' && <div className="container">
        <input type='number' onChange={(e: ChangeEvent<HTMLInputElement>) => setHours(parseInt(e.target.value) ?? 0)} />
        <button onClick={() => setMode('WORKING')}> Start </button>
        <p>
          Enter the number of hours to work on and click on start
        </p>
      </div>}

      {mode === 'WORKING' && <div className="container">
        <h3> {`Counting down to ${hours} hours`} </h3>
        <h4> {`Time left: ${detailedTimeLeft} `} </h4>
        <button onClick={() => setMode('FINISHED')}> Stop </button>
        <p>
          Giving up? Press <i> Stop </i> to get out
        </p>
      </div>}

      {mode === 'FINISHED' && <div className="container">
        <button onClick={() => setMode('IDLE')}> Start over </button>
        <p>
          You can always reset a new timer and go back to work
        </p>
      </div>}

    </>
  )
}

export default App;
