import React from 'react';
import './App.css';
import { initialize } from './Model.js';
import { config_5x5, config_4x4, config_6x6, config_0x0 } from "./PuzzleOptions";

export default function App() {
  const canvasRef = React.useRef(null); // so we can access the Canvas elsewhere

  React.useEffect(() => {
    let canvas = canvasRef.current;
  }, []);

  return (
    <main>
      <div className="button-group">
        <button className='config-button' onClick={initialize(config_4x4, canvasRef.current)}>4x4</button>
        <button className='config-button' onClick={initialize(config_5x5, canvasRef.current)}>5x5</button>
        <button className='config-button' onClick={initialize(config_6x6, canvasRef.current)}>6x6</button>
      </div>

      <canvas id='ctx' ref={canvasRef} width='600' height='600' />
      
      <div className='button-group'>
        <button className='game-button'>Reset Game</button>
        <button className='game-button'>Complete Game</button>
      </div>
      <div className="button-group">
        <button className="move-button">Up</button>
        <button className='move-button'>Down</button>
        <button className='move-button'>Left</button>
        <button className='move-button'>Right</button>
      </div>
    </main>
  );
}
