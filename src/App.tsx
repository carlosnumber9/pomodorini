import { useState, type ChangeEvent } from 'react'
import type { Coordinates, Mode } from './declarations';
import { usePomodorini } from './usePomodorini';
import './App.css'
import { usePomio } from './usePomio';

function App() {
  const [hours, setHours] = useState<number>(0);
  const [mode, setMode] = useState<Mode>('IDLE');
  const detailedTimeLeft: string = usePomodorini(hours, mode, setMode);
  const { x, y }: Coordinates = usePomio();
  console.log(`Coordinates: x=${x}, y=${y}`);
  return (
    <>
      <h1>Pomodorini</h1>
      <svg className="pomio" style={{ left: x, top: y }} width="725" height="681" viewBox="0 0 725 681" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M725 362C725 538.179 562.703 681 362.5 681C162.297 681 0 538.179 0 362C0 185.821 162.297 43 362.5 43C562.703 43 725 185.821 725 362Z" fill="#E24F2A" />
        <path id="left-eye" d="M288 240C288 258.778 278.822 274 267.5 274C256.178 274 247 258.778 247 240C247 221.222 256.178 206 267.5 206C278.822 206 288 221.222 288 240Z" fill="#414141" />
        <path id="right-eye" d="M478 240C478 258.778 468.822 274 457.5 274C446.178 274 437 258.778 437 240C437 221.222 446.178 206 457.5 206C468.822 206 478 221.222 478 240Z" fill="#414141" />
        <path d="M363 0L384.329 30.0578L453.35 30.0578L397.511 48.6345L418.84 78.6922L363 60.1155L307.16 78.6922L328.489 48.6345L272.65 30.0578L341.671 30.0578L363 0Z" fill="#43A700" />
        <path d="M413 456.5C413 462.299 390.614 467 363 467C335.386 467 313 462.299 313 456.5C313 450.701 335.386 446 363 446C390.614 446 413 450.701 413 456.5Z" fill="#414141" />
      </svg>
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

export default App
