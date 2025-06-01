import { useState, type ChangeEvent } from 'react'
import './App.css'
import type { Mode } from './declarations';
import { usePomodorini } from './usePomodorini';

function App() {
  const [hours, setHours] = useState<number>(0);
  const [mode, setMode] = useState<Mode>('IDLE');
  const detailedTimeLeft: string = usePomodorini(hours, mode, setMode);
  return (
    <>
      <h1>Pomodorini</h1>
      {mode === 'IDLE' && <div className="card">
        <input type='number' onChange={(e: ChangeEvent<HTMLInputElement>) => setHours(parseInt(e.target.value) ?? 0)} />
        <button onClick={() => setMode('WORKING')}> Start </button>
        <p>
          Enter the number of hours to work on and click on start
        </p>
      </div>}

      {mode === 'WORKING' && <div className="card">
        <h3> {`Counting down to ${hours} hours`} </h3>
        <h4> {`Time left: ${detailedTimeLeft} `} </h4>
        <button onClick={() => setMode('FINISHED')}> Stop </button>
        <p>
          Giving up? Press <i> Stop </i> to get out
        </p>
      </div>}

      {mode === 'FINISHED' && <div className="card">
        <button onClick={() => setMode('IDLE')}> Start over </button>
        <p>
          You can always reset a new timer and go back to work
        </p>
      </div>}

    </>
  )
}

export default App
