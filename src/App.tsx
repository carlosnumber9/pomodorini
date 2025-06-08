import { useState, type ChangeEvent } from 'react'
import { Pomio, Timer } from './components';
import { usePomodorini } from './hooks';
import type { Mode } from './declarations';
import { getDetailedTime } from './utils';
import './App.css'

function App() {
  const [totalWorkTime, setTotalWorkTime] = useState<number>(0);
  const [mode, setMode] = useState<Mode>('IDLE');
  const timeLeft: number = usePomodorini(totalWorkTime, mode, setMode);
  return (
    <>
      <h1>Pomodorini</h1>

      {mode === 'IDLE' && <>
        {Array.from({ length: (Math.random() * 10) + 2 }).map((_, id: number) => (
          <Pomio key={id} id={id} />
        ))}
        <div className="container">
          <input type='number' onChange={(e: ChangeEvent<HTMLInputElement>) => setTotalWorkTime(parseInt(e.target.value) ?? 0)} />
          <button onClick={() => setMode('WORKING')}> Start </button>
          <p>
            Enter the number of hours to work on and click on start
          </p>
        </div></>
      }

      {mode === 'WORKING' && <div className="container">
        <h3> {`Counting down to ${totalWorkTime} hours`} </h3>
        <h4> {`Time left: ${getDetailedTime(timeLeft)} `} </h4>
        <button onClick={() => setMode('FINISHED')}> Stop </button>
        <p>
          Giving up? Press <i> Stop </i> to get out
        </p>
        <Timer totalTime={totalWorkTime} timeLeft={timeLeft} />
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
